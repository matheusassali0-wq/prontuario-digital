-- Create settings/configuration tables for PR10

CREATE TABLE "Setting" (
    "key" TEXT NOT NULL,
    "value" JSONB,
    "isSecret" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Setting_pkey" PRIMARY KEY ("key")
);

CREATE TABLE "ApiSecret" (
    "key" TEXT NOT NULL,
    "cipher" BYTEA NOT NULL,
    "nonce" BYTEA NOT NULL,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ApiSecret_pkey" PRIMARY KEY ("key")
);

CREATE TABLE "FeatureFlag" (
    "key" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FeatureFlag_pkey" PRIMARY KEY ("key")
);
