'use strict';
import { z } from 'zod';

export const NoteCreateSchema = z.object({
    encounterId: z.string().trim().min(1),
    authorId: z.string().trim().optional(),
    contentText: z.string().trim().min(1),
}).strict();

export const NoteUpdateSchema = z.object({
    contentText: z.string().trim().min(1),
    authorId: z.string().trim().optional(),
}).strict();

export const NoteRecordSchema = z.object({
    id: z.string().min(1),
    encounterId: z.string().min(1),
    authorId: z.string().nullable(),
    contentText: z.string().min(1),
    version: z.number().int().positive(),
    createdAt: z.string().min(1),
    updatedAt: z.string().min(1),
});
export type NoteCreateInput = z.infer<typeof NoteCreateSchema>;
export type NoteUpdateInput = z.infer<typeof NoteUpdateSchema>;
export type NoteRecord = z.infer<typeof NoteRecordSchema>;
