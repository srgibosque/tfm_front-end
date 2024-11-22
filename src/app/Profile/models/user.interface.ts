export interface User {
  id?: number;
  name: string;
  email: string;
  gender: string;
  birthdate: Date | null;
  createdAt?: string;
  updatedAt?: string; 
}