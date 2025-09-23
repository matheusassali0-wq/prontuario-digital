-- Ensure sequences exist
CREATE SEQUENCE IF NOT EXISTS prescription_seq START 1 INCREMENT 1 NO MINVALUE NO MAXVALUE CACHE 1;
CREATE SEQUENCE IF NOT EXISTS exam_order_seq START 1 INCREMENT 1 NO MINVALUE NO MAXVALUE CACHE 1;

-- Ensure tables have defaults pointing to sequences (idempotent)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'Prescription' AND column_name = 'number'
  ) THEN
    EXECUTE 'ALTER TABLE "Prescription" ALTER COLUMN "number" SET DEFAULT nextval(''prescription_seq'')';
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ExamOrder' AND column_name = 'number'
  ) THEN
    EXECUTE 'ALTER TABLE "ExamOrder" ALTER COLUMN "number" SET DEFAULT nextval(''exam_order_seq'')';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'Prescription_patientId_number_key'
  ) THEN
    EXECUTE 'CREATE UNIQUE INDEX "Prescription_patientId_number_key" ON "Prescription"("patientId", "number")';
  END IF;
  -- Create ExamOrder unique only if table exists
  IF EXISTS (
    SELECT 1 FROM information_schema.tables WHERE table_name = 'ExamOrder'
  ) THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_indexes WHERE indexname = 'ExamOrder_patientId_number_key'
    ) THEN
      EXECUTE 'CREATE UNIQUE INDEX "ExamOrder_patientId_number_key" ON "ExamOrder"("patientId", "number")';
    END IF;
  END IF;
END $$;

SELECT setval('prescription_seq', COALESCE((SELECT MAX("number") FROM "Prescription"), 0) + 1, false);
-- Guard exam_order_seq sync if table does not exist yet
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables WHERE table_name = 'ExamOrder'
  ) THEN
    PERFORM setval('exam_order_seq', COALESCE((SELECT MAX("number") FROM "ExamOrder"), 0) + 1, false);
  ELSE
    PERFORM setval('exam_order_seq', 1, false);
  END IF;
END $$;

-- Optional: migrate legacy Counter table if present
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'Counter') THEN
    RAISE NOTICE 'Migrating Counter table is project-specific; please map Counter values to respective sequences as needed.';
    -- Example (commented):
    -- SELECT setval('prescription_seq', GREATEST((SELECT MAX(val) FROM "Counter" WHERE name = ''prescription''), currval(''prescription_seq'')) + 1, false);
  END IF;
END $$;
