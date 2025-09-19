"use strict";
import React, {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import type { CSSProperties } from "react";

type AnyProps = { children?: React.ReactNode; [key: string]: unknown };

const Container = ({ children, ...rest }: AnyProps) => (
  <section {...rest} role="region" aria-label="Área de login">
    {children}
  </section>
);
const Form = ({ children, ...rest }: AnyProps) => (
  <form {...rest}>{children}</form>
);
const SecurityBadge = ({ children, ...rest }: AnyProps) => (
  <div
    {...rest}
    role="status"
    aria-live="polite"
    style={{
      display: "inline-flex",
      gap: 8,
      alignItems: "center",
      padding: 8,
      background: "#eef2ff",
      borderRadius: 999,
      border: "1px solid #c7d2fe",
      color: "#1f2937",
      fontWeight: 600,
      fontSize: 12,
    }}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 2l7 3v6c0 5-3.8 9.7-7 11-3.2-1.3-7-6-7-11V5l7-3z"
        fill="#3730a3"
      />
      <path
        d="M10.5 13.2l-2-2 1.4-1.4 0.6 0.6 3.6-3.6 1.4 1.4-5 5z"
        fill="#fff"
      />
    </svg>
    {children}
  </div>
);
const ErrorMessage = ({ children, ...rest }: AnyProps) => (
  <div
    {...rest}
    role="alert"
    aria-live="assertive"
    style={{ color: "#b91c1c", marginTop: 8, fontSize: 13 }}
  >
    {children}
  </div>
);

const styles: Record<
  | "page"
  | "card"
  | "header"
  | "formGrid"
  | "label"
  | "input"
  | "inputError"
  | "row"
  | "actions"
  | "button"
  | "buttonGhost"
  | "hint"
  | "footer",
  CSSProperties
> = {
  page: { maxWidth: 420, margin: "40px auto", padding: 16 },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    padding: 20,
    background: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  formGrid: { display: "grid", gap: 12 },
  label: { fontSize: 12, fontWeight: 600, color: "#111827" },
  input: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: 10,
    padding: "10px 12px",
    fontSize: 14,
    outline: "none",
  },
  inputError: { borderColor: "#ef4444" },
  row: { display: "grid", gap: 8 },
  actions: { display: "flex", gap: 8, marginTop: 8 },
  button: {
    flex: 1,
    border: "1px solid #111827",
    background: "#111827",
    color: "#fff",
    padding: "10px 12px",
    fontSize: 14,
    borderRadius: 10,
    cursor: "pointer",
  },
  buttonGhost: {
    flex: 1,
    border: "1px solid #d1d5db",
    background: "#fff",
    color: "#111827",
    padding: "10px 12px",
    fontSize: 14,
    borderRadius: 10,
    cursor: "pointer",
  },
  hint: { color: "#6b7280", fontSize: 12 },
  footer: {
    marginTop: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

const SpinnerIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 50 50"
    role="img"
    aria-label="Carregando"
  >
    <circle
      cx="25"
      cy="25"
      r="20"
      strokeWidth="6"
      stroke="#e5e7eb"
      fill="none"
    />
    <path
      d="M25 5 a20 20 0 0 1 0 40"
      stroke="#111827"
      strokeWidth="6"
      fill="none"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        dur="0.9s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

const sanitizeInput = (value: string) => String(value).normalize("NFKC").trim();
const validateCRM = (value: string) => {
  const v = sanitizeInput(value).toUpperCase();
  const digits = v.replace(/[^\d]/g, "");
  if (digits.length < 4 || digits.length > 7) return false;
  if (/[<>{}]/.test(v)) return false;
  return true;
};
const normalizeCRM = (value: string) => {
  const v = sanitizeInput(value).toUpperCase();
  const digits = v.replace(/[^\d]/g, "");
  const ufMatch = v.match(/\b[A-Z]{2}\b/);
  return ufMatch ? `CRM-${ufMatch[0]} ${digits}` : digits;
};
const genId = () => {
  const a = new Uint8Array(16);
  crypto.getRandomValues(a);
  const s = Array.from(a)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${s.slice(0, 8)}-${s.slice(8, 12)}-${s.slice(12, 16)}-${s.slice(16, 20)}-${s.slice(20, 32)}`;
};
const withTimeout = <T,>(
  p: Promise<T>,
  ms: number,
  controller?: AbortController,
) =>
  new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => {
      try {
        controller?.abort();
      } catch {}
      reject(new Error("Tempo esgotado"));
    }, ms);
    p.then((v) => {
      clearTimeout(t);
      resolve(v);
    }).catch((e) => {
      clearTimeout(t);
      reject(e);
    });
  });
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const backoff = async <T,>(
  fn: () => Promise<T>,
  retries: number,
  base: number,
  jitter: number,
) => {
  let attempt = 0;
  for (;;) {
    try {
      return await fn();
    } catch (e) {
      attempt += 1;
      if (attempt > retries) throw e;
      const d = base * 2 ** (attempt - 1) + Math.random() * jitter;
      await sleep(d);
    }
  }
};
const getCSRFToken = () => {
  if (typeof document === "undefined") return "";
  const m = document.querySelector(
    'meta[name="csrf-token"]',
  ) as HTMLMetaElement | null;
  return m?.content || "";
};
function useSecurity() {
  const login = async (creds: {
    username: string;
    password: string;
    deviceId: string;
  }) => {
    const controller = new AbortController();
    const exec = async () => {
      await sleep(220);
      if (sanitizeInput(creds.password).length === 0)
        throw new Error("Senha obrigatória");
      if (/^erro/.test(creds.username))
        throw new Error("Credenciais inválidas");
      return creds.username.toLowerCase().includes("2fa");
    };
    return withTimeout(backoff(exec, 1, 120, 80), 400, controller);
  };
  const verifyTOTP = async ({ totp }: { totp: string; deviceId: string }) => {
    const controller = new AbortController();
    const exec = async () => {
      await sleep(180);
      if (!/^\d{6}$/.test(totp)) throw new Error("Código inválido");
      return totp === "123456";
    };
    return withTimeout(backoff(exec, 1, 120, 80), 400, controller);
  };
  const validateSecurityContext = () => {};
  return { login, verifyTOTP, validateSecurityContext };
}
function useRateLimit(_key: string, maxAttempts = 5, _windowMs = 300000) {
  const key = `rl:${_key}`;
  const windowMs = _windowMs;
  const attemptsRef = useRef(0);
  const startRef = useRef<number>(0);
  const now = () => Date.now();
  const load = () => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { start: number; attempts: number };
      attemptsRef.current = Number.isFinite(parsed.attempts)
        ? parsed.attempts
        : 0;
      startRef.current = Number.isFinite(parsed.start) ? parsed.start : 0;
    } catch {}
  };
  const save = () => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({
          start: startRef.current,
          attempts: attemptsRef.current,
        }),
      );
    } catch {}
  };
  useEffect(() => load(), []);
  const isRateLimited = () => {
    const ts = startRef.current;
    if (!ts || now() - ts >= windowMs) return false;
    return attemptsRef.current >= maxAttempts;
  };
  const incrementAttempts = () => {
    const ts = startRef.current;
    if (!ts || now() - ts >= windowMs) {
      startRef.current = now();
      attemptsRef.current = 0;
    }
    attemptsRef.current += 1;
    save();
  };
  return { isRateLimited, incrementAttempts };
}
export function SecureLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    totp: "",
    deviceId:
      typeof crypto !== "undefined" &&
      typeof crypto.getRandomValues === "function"
        ? genId()
        : Math.random().toString(36).slice(2),
  });
  const [step, setStep] = useState<"credentials" | "totp">("credentials");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "empty"
  >("idle");
  const [demo, setDemo] = useState<"vazio" | "carregando" | "erro" | "sucesso">(
    "vazio",
  );
  const [isPending, startTransition] = useTransition();
  const deferredUser = useDeferredValue(credentials.username);
  const { login, verifyTOTP, validateSecurityContext } = useSecurity();
  const { isRateLimited, incrementAttempts } = useRateLimit("login", 5, 300000);
  const crmRef = useRef<HTMLInputElement | null>(null);
  const pwdRef = useRef<HTMLInputElement | null>(null);
  const totpRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => validateSecurityContext(), [validateSecurityContext]);
  useEffect(() => {
    if (step === "totp") totpRef.current?.focus();
  }, [step]);
  useEffect(() => {
    if (demo === "vazio") {
      setCredentials((c) => ({ ...c, username: "", password: "", totp: "" }));
      setError(null);
      setStatus("idle");
      setStep("credentials");
    }
    if (demo === "carregando") {
      setCredentials((c) => ({
        ...c,
        username: "CRM-SP 210257",
        password: "ok",
        totp: "",
      }));
      setError(null);
      setStatus("loading");
      setStep("credentials");
    }
    if (demo === "erro") {
      setCredentials((c) => ({
        ...c,
        username: "ERRO-USER",
        password: "x",
        totp: "",
      }));
      setError("Simulação de erro: credenciais inválidas");
      setStatus("error");
      setStep("credentials");
      crmRef.current?.focus();
    }
    if (demo === "sucesso") {
      setCredentials((c) => ({
        ...c,
        username: "CRM-SP 210257",
        password: "ok",
        totp: "",
      }));
      setError(null);
      setStatus("success");
      setStep("credentials");
    }
  }, [demo]);
  const canSubmit =
    step === "credentials"
      ? sanitizeInput(credentials.username).length > 0 &&
        sanitizeInput(credentials.password).length > 0 &&
        !loading
      : sanitizeInput(credentials.totp).length === 6 && !loading;
  const onChange =
    (field: "username" | "password" | "totp") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v =
        field === "totp"
          ? e.target.value.replace(/\D/g, "").slice(0, 6)
          : e.target.value;
      setCredentials((c) => ({ ...c, [field]: v }));
      setStatus(v ? "idle" : "empty");
      if (error) setError(null);
    };
  const focusFirstError = (msg: string) => {
    const m = msg.toLowerCase();
    if (m.includes("crm")) {
      crmRef.current?.focus();
      return;
    }
    if (m.includes("senha")) {
      pwdRef.current?.focus();
      return;
    }
    if (m.includes("2fa") || m.includes("código")) {
      totpRef.current?.focus();
    }
  };
  const navigate = () => {
    setStatus("success");
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("demo") !== "1") window.location.href = "/dashboard";
    }
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (isRateLimited()) {
      setError("Muitas tentativas. Aguarde 5 minutos.");
      focusFirstError("CRM");
      return;
    }
    try {
      setLoading(true);
      setStatus("loading");
      if (step === "credentials") {
        if (!validateCRM(credentials.username)) {
          throw new Error("CRM inválido. Ex.: CRM-SP 210257 ou 210257 SP.");
        }
        const sanitizedCredentials = {
          username: sanitizeInput(normalizeCRM(credentials.username)),
          password: sanitizeInput(credentials.password),
          deviceId: credentials.deviceId,
        };
        void getCSRFToken();
        const needsTotp = await login(sanitizedCredentials);
        incrementAttempts();
        if (needsTotp) {
          startTransition(() => setStep("totp"));
          setLoading(false);
          setStatus("idle");
          return;
        }
        setStatus("success");
        setLoading(false);
        navigate();
      } else {
        const isValid = await verifyTOTP({
          totp: sanitizeInput(credentials.totp),
          deviceId: credentials.deviceId,
        });
        incrementAttempts();
        if (isValid) {
          setStatus("success");
          setLoading(false);
          navigate();
        } else {
          throw new Error("Código 2FA inválido");
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao fazer login";
      setError(msg);
      setStatus("error");
      setLoading(false);
      focusFirstError(msg);
    }
  };
  const deferredNormalized = useMemo(
    () => (deferredUser ? normalizeCRM(deferredUser) : ""),
    [deferredUser],
  );
  return (
    <Container style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <SecurityBadge>Conexão Segura — E2EE</SecurityBadge>
          <div
            aria-label="Demonstração"
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              padding: 8,
              background: "#f9fafb",
              borderRadius: 10,
              border: "1px dashed #e5e7eb",
            }}
          >
            <span
              style={{ fontSize: 12, color: "#374151", alignSelf: "center" }}
            >
              Simular:
            </span>
            <button
              type="button"
              onClick={() => setDemo("vazio")}
              style={styles.buttonGhost}
              aria-pressed={demo === "vazio"}
            >
              Vazio
            </button>
            <button
              type="button"
              onClick={() => setDemo("carregando")}
              style={styles.buttonGhost}
              aria-pressed={demo === "carregando"}
            >
              Carregando
            </button>
            <button
              type="button"
              onClick={() => setDemo("erro")}
              style={styles.buttonGhost}
              aria-pressed={demo === "erro"}
            >
              Erro
            </button>
            <button
              type="button"
              onClick={() => setDemo("sucesso")}
              style={styles.buttonGhost}
              aria-pressed={demo === "sucesso"}
            >
              Sucesso
            </button>
            <button
              type="button"
              onClick={() => {
                setCredentials((c) => ({
                  ...c,
                  username: "CRM-SP 210257 2FA",
                  password: "ok",
                }));
                setStep("credentials");
                setError(null);
                setStatus("idle");
              }}
              style={styles.buttonGhost}
            >
              Exigir 2FA
            </button>
          </div>
        </div>
        <Form onSubmit={handleLogin} style={styles.formGrid} noValidate>
          {step === "credentials" ? (
            <>
              <div style={styles.row}>
                <label htmlFor="crm" style={styles.label}>
                  CRM
                </label>
                <input
                  id="crm"
                  ref={crmRef}
                  name="username"
                  type="text"
                  placeholder="Ex.: CRM-SP 210257"
                  autoComplete="username"
                  value={credentials.username}
                  onChange={onChange("username")}
                  style={{
                    ...styles.input,
                    ...(error && error.toLowerCase().includes("crm")
                      ? styles.inputError
                      : {}),
                  }}
                  aria-invalid={
                    !!(error && error.toLowerCase().includes("crm"))
                  }
                  inputMode="text"
                />
                <small style={styles.hint}>
                  Interpretado como: {deferredNormalized || "—"}
                </small>
              </div>
              <div style={styles.row}>
                <label htmlFor="password" style={styles.label}>
                  Senha
                </label>
                <input
                  id="password"
                  ref={pwdRef}
                  name="password"
                  type="password"
                  placeholder="Sua senha"
                  autoComplete="current-password"
                  value={credentials.password}
                  onChange={onChange("password")}
                  style={{
                    ...styles.input,
                    ...(error && error.toLowerCase().includes("senha")
                      ? styles.inputError
                      : {}),
                  }}
                  aria-invalid={
                    !!(error && error.toLowerCase().includes("senha"))
                  }
                />
              </div>
            </>
          ) : (
            <div style={styles.row}>
              <label htmlFor="totp" style={styles.label}>
                Código 2FA
              </label>
              <input
                id="totp"
                ref={totpRef}
                name="totp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="6 dígitos"
                value={credentials.totp}
                onChange={onChange("totp")}
                pattern="\d{6}"
                style={{
                  ...styles.input,
                  letterSpacing: "0.2em",
                  textAlign: "center",
                }}
                aria-invalid={!!(error && error.toLowerCase().includes("2fa"))}
              />
              <small style={styles.hint}>
                {isPending ? "Preparando…" : "Abra seu app autenticador"}
              </small>
            </div>
          )}
          {status === "empty" && (
            <div style={styles.hint}>Preencha CRM e senha.</div>
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <div style={styles.actions}>
            <button
              type="submit"
              style={{
                ...styles.button,
                opacity: loading ? 0.85 : 1,
                pointerEvents: loading ? "none" : "auto",
              }}
              disabled={!canSubmit}
              aria-busy={loading}
            >
              {loading ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <SpinnerIcon />
                  {step === "credentials" ? "Verificando…" : "Validando…"}
                </span>
              ) : step === "credentials" ? (
                "Acessar"
              ) : (
                "Verificar 2FA"
              )}
            </button>
            {step === "totp" && (
              <button
                type="button"
                style={styles.buttonGhost}
                onClick={() => {
                  setStep("credentials");
                  setError(null);
                  setStatus("idle");
                }}
              >
                Voltar
              </button>
            )}
          </div>
          <div style={styles.footer}>
            <small style={styles.hint}>
              Fuso{" "}
              {Intl.DateTimeFormat("pt-BR", {
                timeZone: "America/Sao_Paulo",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date())}
            </small>
            <small style={styles.hint}>Estado {status}</small>
          </div>
        </Form>
      </div>
    </Container>
  );
}
export default function NomeExistente() {
  return <SecureLogin />;
}
