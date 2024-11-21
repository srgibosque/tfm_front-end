export interface User {
  id: number | undefined;
  name: string;
  email: string;
  gender: string;
  birthdate: Date | null;
  createdAt?: string;
  updatedAt?: string; 
}