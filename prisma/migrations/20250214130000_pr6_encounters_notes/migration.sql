-- CreateTable Encounter
CREATE TABLE "Encounter" (
    "id" TEXT PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable Note
CREATE TABLE "Note" (
    "id" TEXT PRIMARY KEY,
    "encounterId" TEXT NOT NULL,
    "authorId" TEXT,
    "contentText" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable NoteVersion
CREATE TABLE "NoteVersion" (
    "id" TEXT PRIMARY KEY,
    "noteId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "contentText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable Attachment
CREATE TABLE "Attachment" (
    "id" TEXT PRIMARY KEY,
    "noteId" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX "Encounter_patientId_date_idx" ON "Encounter"("patientId", "date");
CREATE INDEX "Note_encounterId_updatedAt_idx" ON "Note"("encounterId", "updatedAt");
CREATE UNIQUE INDEX "NoteVersion_noteId_version_key" ON "NoteVersion"("noteId", "version");
CREATE INDEX "Attachment_noteId_createdAt_idx" ON "Attachment"("noteId", "createdAt");

-- Foreign Keys
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Note" ADD CONSTRAINT "Note_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "Encounter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "NoteVersion" ADD CONSTRAINT "NoteVersion_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
