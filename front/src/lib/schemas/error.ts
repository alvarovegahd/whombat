import { z } from "zod";

export const NotFoundErrorSchema = z.object({
  error_type: z.literal("NotFoundError"),
  message: z.string(),
  format: z.string().optional(),
  details: z.string().optional(),
}).passthrough();

export const DuplicateObjectErrorSchema = z.object({
  error_type: z.literal("DuplicateObjectError"),
  message: z.string(),
}).passthrough();

export const DataFormatErrorSchema = z.object({
  error_type: z.literal("DataFormatError"),
  message: z.string(),
}).passthrough();

export const DataIntegrityErrorSchema = z.object({
  error_type: z.literal("DataIntegrityError"),
  message: z.string(),
}).passthrough();

export const ErrorSchema = z.discriminatedUnion("error_type", [
  NotFoundErrorSchema,
  DuplicateObjectErrorSchema,
  DataFormatErrorSchema,
  DataIntegrityErrorSchema,
]);

export type ErrorData = z.infer<typeof ErrorSchema>;
