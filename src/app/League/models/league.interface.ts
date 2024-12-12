import { Team } from "../../Team/models/team.interface";
import { Match } from "../../Match/models/match.interface";

export interface League {
  id?: number;
  name: string;
  location: string;
  Matches: Match[];
  Teams: Team[];
  createdAt?: string;
  updatedAt?: string;
}