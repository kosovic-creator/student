import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...Inputs: ClassValue[]) {
  return twMerge(clsx(Inputs))
}
