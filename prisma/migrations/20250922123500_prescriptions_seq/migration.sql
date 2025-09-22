-- Create sequence for prescription numbering
CREATE SEQUENCE IF NOT EXISTS prescription_seq START 1 INCREMENT 1;

-- Create table Prescription
CREATE TABLE "Prescription" (
  "id" TEXT NOT NULL,
  "number" INTEGER NOT NULL DEFAULT nextval('prescription_seq'),
  "patientId" TEXT NOT NULL,
  "formato" TEXT NOT NULL,
  "cid" TEXT,
  "observacoes" TEXT,
  "items" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Prescription_pkey" PRIMARY KEY ("id")
);

-- Constraints and indexes
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_patientId_fkey"
  FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE UNIQUE INDEX "Prescription_number_key" ON "Prescription"("number");
CREATE INDEX "Prescription_patientId_createdAt_idx" ON "Prescription"("patientId", "createdAt");
