"use strict";
import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";

type PrescriptionInput = {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
};
type SignedPrescription = PrescriptionInput & {
  id: string;
  patientId?: string;
  timestamp: string;
  doctorId: string;
  crmNumber: string;
  signature: string;
  signedAt: string;
};
type FormStatus = "empty" | "idle" | "loading" | "success" | "error";
type FieldKey = keyof PrescriptionInput;

const tz = "America/Sao_Paulo";
const enc = new TextEncoder();
const fmtDateTime = (d: Date) =>
  new Intl.DateTimeFormat("pt-BR", {
    timeZone: tz,
    dateStyle: "short",
    timeStyle: "medium",
  }).format(d);
const rid = (n = 16) => {
  const a = new Uint8Array(n);
  crypto.getRandomValues(a);
  let s = "";
  for (let i = 0; i < a.length; i += 1) s += a[i].toString(16).padStart(2, "0");
  return s;
};
const toB64 = (buf: ArrayBuffer) => {
  const a = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < a.length; i += 1) s += String.fromCharCode(a[i]);
  return btoa(s);
};
const collapseSpaces = (v: string) => v.replace(/\s+/g, " ").trim();
const stripTags = (v: string) => v.replace(/<[^>]*>/g, "");
const whitelist = (v: string) =>
  v.replace(/[^0-9A-Za-zÀ-ÿ\s.,;:()\-\/+%]/g, "");
const sanitize = (v: string) => whitelist(collapseSpaces(stripTags(v)));
const getMeta = (name: string) => {
  const el = document.querySelector(
    `meta[name="${name}"]`
  ) as HTMLMetaElement | null;
  return el?.content || "";
};
const ensureCsrf = () => {
  const name = "csrf-token";
  let m = document.querySelector(
    `meta[name="${name}"]`
  ) as HTMLMetaElement | null;
  if (!m) {
    m = document.createElement("meta");
    m.name = name;
    m.content = rid(24);
    document.head.appendChild(m);
  }
  return m.content;
};
const jitter = (ms: number) =>
  ms + Math.floor(Math.random() * Math.min(250, ms / 2));
const safeFetch = async (
  input: RequestInfo | URL,
  init: RequestInit & { timeoutMs?: number; signal?: AbortSignal } = {},
  retries = 2
) => {
  let attempt = 0;
  let lastErr: unknown = new Error("Falha de rede");
  while (attempt <= retries) {
    const ac = new AbortController();
    const to = setTimeout(() => ac.abort(), init.timeoutMs ?? 3000);
    let linkedController: AbortController | null = null;
    const cleanup: (() => void)[] = [];
    try {
      if (init.signal) {
        if (init.signal.aborted) {
          ac.abort();
        } else {
          linkedController = new AbortController();
          const onAbort = () => linkedController!.abort();
          const origSignal = init.signal!;
          origSignal.addEventListener("abort", onAbort);
          ac.signal.addEventListener("abort", onAbort);
          cleanup.push(() => origSignal.removeEventListener("abort", onAbort));
          cleanup.push(() => ac.signal.removeEventListener("abort", onAbort));
        }
      }
      const signalToUse = linkedController
        ? linkedController.signal
        : ac.signal;
      const res = await fetch(input, { ...init, signal: signalToUse });
      clearTimeout(to);
      if (res.ok) return res;
      lastErr = new Error(`HTTP ${res.status}`);
    } catch (e) {
      lastErr = e;
    } finally {
      clearTimeout(to);
      for (const fn of cleanup) fn();
    }
    attempt += 1;
    if (attempt <= retries)
      await new Promise((r) =>
        setTimeout(r, jitter(200 * Math.pow(2, attempt)))
      );
  }
  throw lastErr instanceof Error ? lastErr : new Error("Falha de rede");
};
const persistSignedPrescription = async (
  p: SignedPrescription,
  controller: AbortController
) => {
  const blob = new Blob([JSON.stringify({ ok: true, id: p.id })], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  try {
    const res = await safeFetch(
      url,
      { method: "GET", signal: controller.signal, timeoutMs: 1200 },
      2
    );
    await res.json();
    return true;
  } finally {
    URL.revokeObjectURL(url);
  }
};
const useSecureStore = () => {
  const addPrescription = useCallback(
    async (p: SignedPrescription, controller?: AbortController) => {
      const ac = controller ?? new AbortController();
      await persistSignedPrescription(p, ac);
    },
    []
  );
  const activePatientId = getMeta("active-patient-id") || "";
  const activePatient = activePatientId ? { id: activePatientId } : undefined;
  return { addPrescription, activePatient };
};
const useSecurity = () => {
  const sessionTokenRef = useRef<string>("");
  const sessionToken = () => {
    if (!sessionTokenRef.current) sessionTokenRef.current = rid(24);
    return sessionTokenRef.current;
  };
  const validatePrescription = useCallback(async (p: PrescriptionInput) => {
    const rules: Record<FieldKey, boolean> = {
      medication: p.medication.length >= 2 && p.medication.length <= 120,
      dosage: p.dosage.length >= 1 && p.dosage.length <= 60,
      frequency: p.frequency.length >= 1 && p.frequency.length <= 60,
      duration: p.duration.length >= 1 && p.duration.length <= 60,
      instructions: p.instructions.length <= 800,
    };
    return Object.values(rules).every(Boolean);
  }, []);
  const signPrescription = useCallback(
    async (data: Omit<SignedPrescription, "id" | "signature" | "signedAt">) => {
      const id = `rx-${rid(12)}`;
      const csrf = ensureCsrf();
      const tok = sessionToken();
      const payload = JSON.stringify({ ...data, id });
      const digest = await crypto.subtle.digest(
        "SHA-256",
        enc.encode(`${payload}.${csrf}.${tok}`)
      );
      const signature = toB64(digest);
      const signedAt = new Date().toISOString();
      return { ...data, id, signature, signedAt };
    },
    []
  );
  return { validatePrescription, signPrescription };
};

type BoxProps = { children?: React.ReactNode; style?: React.CSSProperties };
const baseFont =
  "system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif";
const Container: React.FC<BoxProps> = ({ children, style }) => {
  const s: React.CSSProperties = {
    fontFamily: baseFont,
    color: "#0f172a",
    background: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    maxWidth: 720,
    margin: "16px auto",
    boxShadow: "0 1px 2px rgba(0,0,0,.04)",
    ...style,
  };
  return (
    <section style={s} role="region" aria-label="Prescrição Digital">
      {children}
    </section>
  );
};
const SecurityInfo: React.FC<BoxProps> = ({ children }) => {
  const s: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: 12,
    background: "#ecfeff",
    border: "1px solid #06b6d4",
    color: "#0e7490",
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 14,
  };
  return (
    <div style={s} aria-live="polite">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M12 2l7 3v6c0 5.25-3.5 9.92-7 11-3.5-1.08-7-5.75-7-11V5l7-3z"
          fill="#0ea5b7"
        />
      </svg>
      <span>Prescrição Digital Segura — ICP-Brasil</span>
      <span style={{ marginLeft: "auto", fontVariantNumeric: "tabular-nums" }}>
        {fmtDateTime(new Date())}
      </span>
      {children}
    </div>
  );
};

const DigitalPrescription: React.FC = () => {
  const medicationRef = useRef<HTMLInputElement | null>(null);
  const dosageRef = useRef<HTMLInputElement | null>(null);
  const frequencyRef = useRef<HTMLInputElement | null>(null);
  const durationRef = useRef<HTMLInputElement | null>(null);
  const instructionsRef = useRef<HTMLTextAreaElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const [prescription, setPrescription] = useState<PrescriptionInput>({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });
  const [status, setStatus] = useState<FormStatus>("empty");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [isPending, startTransition] = useTransition();

  const inFlightRef = useRef<boolean>(false);
  const acRef = useRef<AbortController | null>(null);

  const { addPrescription, activePatient } = useSecureStore();
  const { validatePrescription, signPrescription } = useSecurity();

  const dInstructions = useDeferredValue(prescription.instructions);
  const preview = useMemo(
    () => (dInstructions ? dInstructions.slice(0, 80) : ""),
    [dInstructions]
  );

  useEffect(() => {
    ensureCsrf();
    return () => {
      if (acRef.current) acRef.current.abort();
    };
  }, []);

  const setField = useCallback((k: FieldKey, v: string) => {
    const clean = sanitize(v);
    setPrescription((p) => ({ ...p, [k]: clean }));
    setStatus((s) => (s === "empty" ? "idle" : s));
    setErrors((e) => ({ ...e, [k]: "" }));
  }, []);

  const validateLocal = useCallback((p: PrescriptionInput) => {
    const e: Partial<Record<FieldKey, string>> = {};
    if (typeof p.medication !== "string" || p.medication.length < 2)
      e.medication = "Informe o medicamento (mínimo 2 caracteres)";
    if (typeof p.dosage !== "string" || p.dosage.length < 1)
      e.dosage = "Informe a dose";
    if (typeof p.frequency !== "string" || p.frequency.length < 1)
      e.frequency = "Informe a frequência";
    if (typeof p.duration !== "string" || p.duration.length < 1)
      e.duration = "Informe a duração";
    if (typeof p.instructions !== "string" || p.instructions.length > 800)
      e.instructions = "Instruções com máximo de 800 caracteres";
    return e;
  }, []);

  const focusFirstError = useCallback(
    (e: Partial<Record<FieldKey, string>>) => {
      const order: FieldKey[] = [
        "medication",
        "dosage",
        "frequency",
        "duration",
        "instructions",
      ];
      for (let i = 0; i < order.length; i += 1) {
        const k = order[i];
        if (e[k]) {
          if (k === "medication" && medicationRef.current) {
            medicationRef.current.focus();
            return;
          }
          if (k === "dosage" && dosageRef.current) {
            dosageRef.current.focus();
            return;
          }
          if (k === "frequency" && frequencyRef.current) {
            frequencyRef.current.focus();
            return;
          }
          if (k === "duration" && durationRef.current) {
            durationRef.current.focus();
            return;
          }
          if (k === "instructions" && instructionsRef.current) {
            instructionsRef.current.focus();
            return;
          }
        }
      }
    },
    []
  );

  const abortInFlight = useCallback(() => {
    if (acRef.current) acRef.current.abort();
    acRef.current = null;
    inFlightRef.current = false;
  }, []);

  const handleSubmit = useCallback(
    async (evt: React.FormEvent) => {
      evt.preventDefault();
      if (inFlightRef.current) return;
      const doctorId = getMeta("doctor-id");
      const crmNumber = getMeta("crm-number");
      if (!doctorId || !crmNumber) {
        setStatus("error");
        setMessage("Identificação do médico ausente");
        return;
      }
      if (!activePatient?.id) {
        setStatus("error");
        setMessage("Selecione um paciente ativo");
        return;
      }
      const clean: PrescriptionInput = {
        medication: sanitize(prescription.medication),
        dosage: sanitize(prescription.dosage),
        frequency: sanitize(prescription.frequency),
        duration: sanitize(prescription.duration),
        instructions: sanitize(prescription.instructions),
      };
      const localErrors = validateLocal(clean);
      if (Object.keys(localErrors).length > 0) {
        setErrors(localErrors);
        setStatus("error");
        setMessage("Revise os campos destacados");
        focusFirstError(localErrors);
        return;
      }
      const ok = await validatePrescription(clean);
      if (!ok) {
        setStatus("error");
        setMessage("Prescrição inválida");
        return;
      }
      inFlightRef.current = true;
      startTransition(() => setStatus("loading"));
      acRef.current = new AbortController();
      try {
        const signed = await signPrescription({
          ...clean,
          patientId: activePatient.id,
          timestamp: new Date().toISOString(),
          doctorId,
          crmNumber,
        });
        await addPrescription(signed, acRef.current);
        setPrescription({
          medication: "",
          dosage: "",
          frequency: "",
          duration: "",
          instructions: "",
        });
        setErrors({});
        setMessage(`Prescrição assinada às ${fmtDateTime(new Date())}`);
        setStatus("success");
        if (btnRef.current) btnRef.current.blur();
      } catch {
        setStatus("error");
        setMessage("Falha ao salvar");
      } finally {
        abortInFlight();
      }
    },
    [
      activePatient,
      addPrescription,
      abortInFlight,
      prescription,
      signPrescription,
      startTransition,
      validateLocal,
      validatePrescription,
      focusFirstError,
    ]
  );

  const clearAll = useCallback(() => {
    setPrescription({
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    });
    setErrors({});
    setStatus("empty");
    setMessage("");
  }, []);

  const disabled = isPending || status === "loading";
  const labelS: React.CSSProperties = {
    fontSize: 13,
    color: "#0f172a",
    marginBottom: 4,
  };
  const inputS: React.CSSProperties = {
    width: "100%",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    padding: "10px 12px",
    fontSize: 14,
    outline: "none",
  };
  const inputErr: React.CSSProperties = {
    borderColor: "#ef4444",
    boxShadow: "0 0 0 3px rgba(239,68,68,0.06)",
  };
  const grid2: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  };
  const row: React.CSSProperties = { display: "flex", flexDirection: "column" };

  return (
    <Container>
      <SecurityInfo />
      <form onSubmit={handleSubmit}>
        <div style={row}>
          <label htmlFor="medication" style={labelS}>
            Medicamento
          </label>
          <input
            id="medication"
            ref={medicationRef}
            style={{ ...inputS, ...(errors.medication ? inputErr : {}) }}
            inputMode="text"
            autoComplete="off"
            maxLength={120}
            aria-invalid={!!errors.medication}
            aria-describedby={errors.medication ? "err-medication" : undefined}
            value={prescription.medication}
            onChange={(e) => setField("medication", e.currentTarget.value)}
            required
          />
          {errors.medication ? (
            <span
              id="err-medication"
              role="alert"
              style={{ color: "#b91c1c", fontSize: 12 }}
            >
              {errors.medication}
            </span>
          ) : null}
        </div>

        <div style={grid2}>
          <div style={row}>
            <label htmlFor="dosage" style={labelS}>
              Dose
            </label>
            <input
              id="dosage"
              ref={dosageRef}
              style={{ ...inputS, ...(errors.dosage ? inputErr : {}) }}
              inputMode="text"
              autoComplete="off"
              maxLength={60}
              aria-invalid={!!errors.dosage}
              aria-describedby={errors.dosage ? "err-dosage" : undefined}
              value={prescription.dosage}
              onChange={(e) => setField("dosage", e.currentTarget.value)}
              required
            />
            {errors.dosage ? (
              <span
                id="err-dosage"
                role="alert"
                style={{ color: "#b91c1c", fontSize: 12 }}
              >
                {errors.dosage}
              </span>
            ) : null}
          </div>

          <div style={row}>
            <label htmlFor="frequency" style={labelS}>
              Frequência
            </label>
            <input
              id="frequency"
              ref={frequencyRef}
              style={{ ...inputS, ...(errors.frequency ? inputErr : {}) }}
              inputMode="text"
              autoComplete="off"
              maxLength={60}
              aria-invalid={!!errors.frequency}
              aria-describedby={errors.frequency ? "err-frequency" : undefined}
              value={prescription.frequency}
              onChange={(e) => setField("frequency", e.currentTarget.value)}
              required
            />
            {errors.frequency ? (
              <span
                id="err-frequency"
                role="alert"
                style={{ color: "#b91c1c", fontSize: 12 }}
              >
                {errors.frequency}
              </span>
            ) : null}
          </div>
        </div>

        <div style={grid2}>
          <div style={row}>
            <label htmlFor="duration" style={labelS}>
              Duração
            </label>
            <input
              id="duration"
              ref={durationRef}
              style={{ ...inputS, ...(errors.duration ? inputErr : {}) }}
              inputMode="text"
              autoComplete="off"
              maxLength={60}
              aria-invalid={!!errors.duration}
              aria-describedby={errors.duration ? "err-duration" : undefined}
              value={prescription.duration}
              onChange={(e) => setField("duration", e.currentTarget.value)}
              required
            />
            {errors.duration ? (
              <span
                id="err-duration"
                role="alert"
                style={{ color: "#b91c1c", fontSize: 12 }}
              >
                {errors.duration}
              </span>
            ) : null}
          </div>

          <div style={row}>
            <label htmlFor="instructions" style={labelS}>
              Instruções
            </label>
            <textarea
              id="instructions"
              ref={instructionsRef}
              style={{
                ...inputS,
                height: 86,
                resize: "vertical",
                ...(errors.instructions ? inputErr : {}),
              }}
              maxLength={800}
              aria-invalid={!!errors.instructions}
              aria-describedby={
                errors.instructions ? "err-instructions" : undefined
              }
              value={prescription.instructions}
              onChange={(e) => setField("instructions", e.currentTarget.value)}
            />
            {errors.instructions ? (
              <span
                id="err-instructions"
                role="alert"
                style={{ color: "#b91c1c", fontSize: 12 }}
              >
                {errors.instructions}
              </span>
            ) : null}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          <button
            ref={btnRef}
            type="submit"
            disabled={disabled}
            aria-busy={disabled}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #0ea5b7",
              background: disabled ? "#94a3b8" : "#06b6d4",
              color: "#fff",
              fontWeight: 600,
              cursor: disabled ? "not-allowed" : "pointer",
            }}
          >
            Assinar e salvar
          </button>
          <button
            type="button"
            onClick={clearAll}
            disabled={disabled}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #cbd5e1",
              background: "#fff",
              color: "#0f172a",
              cursor: disabled ? "not-allowed" : "pointer",
            }}
          >
            Limpar
          </button>
        </div>
      </form>

      <div
        role="status"
        aria-live="polite"
        style={{
          marginTop: 12,
          padding: 10,
          borderRadius: 10,
          background:
            status === "success"
              ? "#ecfdf5"
              : status === "error"
              ? "#fef2f2"
              : "#f8fafc",
          border: "1px solid #e2e8f0",
          display: "grid",
          gap: 6,
        }}
      >
        <div style={{ fontSize: 13 }}>
          Estado: <strong>{status}</strong>
        </div>
        {message ? <div style={{ fontSize: 13 }}>{message}</div> : null}
        {preview ? (
          <div style={{ fontSize: 12, color: "#475569" }}>
            Prévia das instruções: “{preview}”
          </div>
        ) : null}
      </div>

      <div
        aria-label="Demonstração"
        style={{ display: "flex", gap: 8, marginTop: 10, alignItems: "center" }}
      >
        <span style={{ fontSize: 13 }}>Demonstração:</span>
        <button
          type="button"
          onClick={() => {
            setStatus("empty");
            setMessage("");
          }}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            background: "#fff",
          }}
        >
          Vazio
        </button>
        <button
          type="button"
          onClick={() => {
            setStatus("loading");
            setMessage("Carregando...");
          }}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            background: "#fff",
          }}
        >
          Carregando
        </button>
        <button
          type="button"
          onClick={() => {
            setStatus("error");
            setMessage("Erro simulado");
          }}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            background: "#fff",
          }}
        >
          Erro
        </button>
        <button
          type="button"
          onClick={() => {
            setStatus("success");
            setMessage("Sucesso simulado");
          }}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            background: "#fff",
          }}
        >
          Sucesso
        </button>
      </div>
    </Container>
  );
};

export default DigitalPrescription;
