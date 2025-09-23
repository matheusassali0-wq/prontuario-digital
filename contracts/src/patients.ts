'use strict';
import { z } from 'zod';

export const PatientCreateUpdateSchema = z
    .object({
        name: z.string().trim().min(1).max(160),
        document: z
            .string()
            .trim()
            .min(3)
            .max(32)
            .optional()
            .or(z.literal(''))
            .transform((v) => (v?.trim() ? v.trim() : null)),
        birthDate: z
            .string()
            .optional()
            .or(z.null())
            .transform((v) => (v ? v : null)),
        contact: z
            .object({
                phone: z.string().trim().max(64).optional(),
                email: z.string().trim().email().max(120).optional(),
                notes: z.string().trim().max(280).optional(),
            })
            .partial()
            .optional()
            .transform((value) => {
                if (!value) return null;
                const cleaned = Object.fromEntries(
                    Object.entries(value)
                        .filter(([, val]) => typeof val === 'string' && val.trim())
                        .map(([k, v]) => [k, (v as string).trim()]),
                );
                return Object.keys(cleaned).length ? cleaned : null;
            }),
        payer: z.string().trim().max(120).optional().or(z.literal('')).transform((v) => (v?.trim() ? v.trim() : null)),
        allergies: z.array(z.string().trim().min(1).max(80)).max(24).optional().default([]),
        tags: z.array(z.string().trim().min(1).max(60)).max(24).optional().default([]),
    })
    .strict();

export const PatientRecordSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    document: z.string().nullable(),
    birthDate: z.string().nullable(),
    contact: z.record(z.any()).nullable(),
    payer: z.string().nullable(),
    allergies: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    createdAt: z.string().min(1),
    updatedAt: z.string().min(1),
});

export type PatientCreateUpdateInput = z.infer<typeof PatientCreateUpdateSchema>;
export type PatientRecord = z.infer<typeof PatientRecordSchema>;
