'use strict';
import { z } from 'zod';

export const EncounterCreateSchema = z
    .object({
        patientId: z.string().trim().min(1),
        date: z.string().optional().or(z.null()),
        type: z.string().trim().min(1).max(64),
    })
    .strict();

export const EncounterRecordSchema = z.object({
    id: z.string().min(1),
    patientId: z.string().min(1),
    date: z.string().min(1),
    type: z.string().min(1),
    createdAt: z.string().min(1),
});
export type EncounterCreateInput = z.infer<typeof EncounterCreateSchema>;
export type EncounterRecord = z.infer<typeof EncounterRecordSchema>;
