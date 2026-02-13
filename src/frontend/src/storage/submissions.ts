export interface Submission {
  name: string;
  phone: string;
  email: string;
  address: string;
  message: string;
  products: Array<{
    productId: string;
    productName: string;
    quantity: number;
  }>;
  timestamp: string;
}

const STORAGE_KEY = 'prasad-submissions';

export function saveSubmission(submission: Submission): void {
  try {
    const existing = getSubmissions();
    existing.push(submission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (error) {
    console.error('Failed to save submission:', error);
    throw new Error('Failed to save submission');
  }
}

export function getSubmissions(): Submission[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to retrieve submissions:', error);
    return [];
  }
}

export function clearSubmissions(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear submissions:', error);
  }
}
