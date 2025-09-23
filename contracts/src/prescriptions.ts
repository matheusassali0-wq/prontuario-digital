'use strict';
import { z } from 'zod';
export const PrescriptionItemSchema = z.object({
    nome: z.string().min(1),
    dose: z.string().trim().optional().default(''),
    via: z.string().trim().optional().default(''),
    horario: z.string().trim().optional().default(''),
    observacao: z.string().trim().optional().default('')
});
export const PrescriptionCreateSchema = z.object({
    patientId: z.string().min(1),
    formato: z.enum(['A4', 'A5']).default('A4'),
    cid: z.string().trim().optional().transform(v => v && v.trim() ? v.trim() : undefined),
    observacoes: z.string().trim().optional().transform(v => v && v.trim() ? v.trim() : undefined),
    items: z.array(PrescriptionItemSchema).min(1)
});
export const PrescriptionRecordSchema = z.object({
    id: z.string().min(1),
    numero: z.number().int().positive(),
    pacienteId: z.string().min(1),
    pacienteNome: z.string().min(1),
    cid: z.string().optional(),
    observacoes: z.string().optional(),
    formato: z.enum(['A4', 'A5']),
    itens: z.array(PrescriptionItemSchema.extend({ ordem: z.number().int().positive() })),
    criadoEm: z.string().min(1),
    tipo: z.literal('PRINT')
});
export type PrescriptionItem = z.infer<typeof PrescriptionItemSchema>;
export type PrescriptionCreateInput = z.infer<typeof PrescriptionCreateSchema>;
export type PrescriptionRecord = z.infer<typeof PrescriptionRecordSchema>;
