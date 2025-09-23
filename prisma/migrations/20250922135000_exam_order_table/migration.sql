-- Create ExamOrder table and related indexes/defaults safely
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables WHERE table_name = 'ExamOrder'
  ) THEN
    EXECUTE 'CREATE TABLE "ExamOrder" (
      id TEXT PRIMARY KEY,
      number INTEGER UNIQUE,
      "patientId" TEXT NOT NULL,
      description TEXT NULL,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )';
    -- Basic index mirroring Prisma schema
    EXECUTE 'CREATE INDEX IF NOT EXISTS "ExamOrder_patientId_createdAt_idx" ON "ExamOrder"("patientId", "createdAt")';
  END IF;
END $$;

-- Ensure default from sequence (idempotent)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_name = 'ExamOrder' AND column_name = 'number'
  )
  AND EXISTS (
    SELECT 1 FROM pg_class WHERE relkind = 'S' AND relname = 'exam_order_seq'
  ) THEN
    EXECUTE 'ALTER TABLE "ExamOrder" ALTER COLUMN "number" SET DEFAULT nextval(''exam_order_seq'')';
  END IF;
END $$;

-- Composite unique per patient+number
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'ExamOrder_patientId_number_key'
  ) THEN
    EXECUTE 'CREATE UNIQUE INDEX "ExamOrder_patientId_number_key" ON "ExamOrder"("patientId", "number")';
  END IF;
END $$;
