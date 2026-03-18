import { z } from "zod";

export type TranslateFn = (key: string) => string;

export const postSchema = (t: TranslateFn) => z.object({
  title: z.string().min(3, { message: t("error_title_min") }).max(7, { message: t("error_title_max") }),
});