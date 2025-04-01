import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function trimWallet(address?: string | null, offset = 0): string {
  if (!address) return "";
  return `${address.slice(0, 3 + offset)}...${address.slice(-4)}`;
}

export function formatCurrency(value?: string | number) {
  return `$${Number(value || 0).toFixed(2)}`;
}

export function isValidSolanaAddress(address: string) {
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{43,44}$/;

  if (typeof address === "string" && base58Regex.test(address)) {
    return true;
  }

  return false;
}
