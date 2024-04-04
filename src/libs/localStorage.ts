import { Auth } from '@models/auth';

const SIGNATURE = 'signature';

// Helper to get user from localStorage
export function getStoredAuth(): Auth | null {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem(SIGNATURE) : '';
    return storedUser ? JSON.parse(storedUser) : null;
}

export function setStoredAuth(auth: Auth): void {
    localStorage.setItem(SIGNATURE, JSON.stringify(auth));
}

export function clearStoredAuth(): void {
    localStorage.removeItem(SIGNATURE);
}

// Set localStorage common
export function getLocalStored(key: string): any {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(key) : '';
    return stored ? JSON.parse(stored) : null;
}

export function setLocalStored(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
}

export function clearLocalStored(key: string): void {
    localStorage.removeItem(key);
}
