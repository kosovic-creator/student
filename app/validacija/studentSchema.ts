import { z } from "zod";

export type TranslateFn = (key: string) => string;

export const studentSchema = (t: TranslateFn) => z.object({
  ime: z.string().min(3, { message: t("name_min_error") }).max(7, { message: t("name_max_error") }),
});