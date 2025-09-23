import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function isMissingTableError(err) {
  return err && err.code === "P2021";
}

async function safeDelete(label, fn) {
  try {
    console.log(`> Deleting ${label}...`);
    await fn();
  } catch (err) {
    if (isMissingTableError(err)) {
      console.warn(`  - Skip ${label}: table not found`);
      return;
    }
    throw err;
  }
}

async function wipe() {
  // Delete in order of dependencies to satisfy FK constraints
  await safeDelete("Attachment", () => prisma.attachment.deleteMany({}));
  await safeDelete("NoteVersion", () => prisma.noteVersion.deleteMany({}));
  await safeDelete("Note", () => prisma.note.deleteMany({}));
  await safeDelete("Encounter", () => prisma.encounter.deleteMany({}));
  await safeDelete("Event", () => prisma.event.deleteMany({}));
  await safeDelete("AuditLog", () => prisma.auditLog.deleteMany({}));
  await safeDelete("Patient", () => prisma.patient.deleteMany({}));
}

async function main() {
  await wipe();
  console.log("Database wiped.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
