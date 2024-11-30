import { User } from "../../Profile/models/user.interface";

export interface Team {
  id: number | undefined;
  name: string;
  contact_email: string;
  Users: User[];
  location: string;
  userteamname: string;
  createdAt?: string;
  updatedAt?: string;
}