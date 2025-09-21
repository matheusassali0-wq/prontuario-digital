CREATE EXTENSION IF NOT EXISTS "pg_trgm";

CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT,
    "birthDate" TIMESTAMPTZ,
    "contactJson" JSONB,
    "payer" TEXT,
    "allergies" TEXT[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[] NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Patient_document_key" ON "Patient"("document");
CREATE INDEX "Patient_name_trgm_idx" ON "Patient" USING GIN ("name" gin_trgm_ops);

CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hashPrev" TEXT,
    CONSTRAINT "Event_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Event_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "Event_patientId_createdAt_idx" ON "Event"("patientId", "createdAt");

CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "who" TEXT,
    "what" TEXT NOT NULL,
    "when" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hashPrev" TEXT,
    "meta" JSONB,
    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AuditLog_when_idx" ON "AuditLog"("when");
