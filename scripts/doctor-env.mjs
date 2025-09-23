import os from "node:os";
import path from "node:path";
import fs from "node:fs";

function isWSL() {
  const rel = os.release().toLowerCase();
  return rel.includes("microsoft") || Boolean(process.env.WSL_DISTRO_NAME);
}

function isWindowsMount(p) {
  return p.startsWith("/mnt/") && /\/mnt\/[a-z]\//.test(p);
}

function isExtFilesystem(p) {
  try {
    // Attempt to check filesystem type via /proc/mounts
    const mounts = fs.readFileSync("/proc/mounts", "utf8");
    const line = mounts
      .split("\n")
      .find((l) => l.includes(" " + p.split("/").slice(0, 3).join("/") + " "));
    if (!line) return true; // fallback allow
    return /( ext4 | ext3 | ext2 )/.test(line);
  } catch {
    return true;
  }
}

const cwd = process.cwd();

// Allow bypass for local experiments
if (process.env.DISABLE_ENV_GUARD === "1") {
  if (process.env.NODE_ENV !== "test") {
    console.warn("[ENV GUARD] Bypass enabled via DISABLE_ENV_GUARD=1");
  }
  process.exit(0);
}

if (process.platform === "linux" && isWSL()) {
  if (isWindowsMount(cwd)) {
    console.error(
      "\n[ENV GUARD] Repositório em partição Windows (/mnt/*). Mova para o WSL (ex.: ~/projetos).",
    );
    console.error(`[ENV GUARD] Diretório atual: ${cwd}`);
    process.exit(1);
  }
  if (!isExtFilesystem(cwd)) {
    console.error(
      "\n[ENV GUARD] Filesystem não-ext detectado. Recomendado ext4 no WSL para performance e compatibilidade.",
    );
    console.error(`[ENV GUARD] Diretório atual: ${cwd}`);
    process.exit(1);
  }
}

// Optional: Block Node on Windows directly (non-WSL)
if (process.platform === "win32") {
  console.error(
    "\n[ENV GUARD] Execução direta no Windows detectada. Utilize WSL/Linux para evitar problemas de filesystem e binários.",
  );
  process.exit(1);
}

// Everything looks fine
if (process.env.NODE_ENV !== "test") {
  console.log("[ENV] OK");
}
