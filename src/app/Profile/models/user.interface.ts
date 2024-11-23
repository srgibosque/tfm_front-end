export interface User {
  id?: number;
  name: string;
  email: string;
  gender: string;
  birthdate: string | null;
  createdAt?: string;
  updatedAt?: string; 
}