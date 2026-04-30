import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { supabaseUrlPublic } from "./supabaseClient"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function publicStorageUrl(bucket: string, path: string) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${supabaseUrlPublic}/storage/v1/object/public/${bucket}/${path}`
}
