import { Match } from "./match.interface";

export interface League {
  id?: number;
  name: string;
  location: string;
  Matches: Match[]
  createdAt?: string;
  updatedAt?: string;
}