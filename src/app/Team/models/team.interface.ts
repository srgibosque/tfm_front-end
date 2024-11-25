import { User } from "../../Profile/models/user.interface";

export interface Team {
  id: number | undefined;
  name: string;
  contactEmail: string;
  players: User[];
  location: string;
  userteamname: string;
  createdAt?: string;
  updatedAt?: string;
}