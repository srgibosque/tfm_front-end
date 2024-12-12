export interface Match {
  id?: number;
  name: string;
  location: string | null;
  date: string | null;
  homeTeamGoals: number | null;
  awayTeamGoals: number | null;
  homeTeamId?: number;
  awayTeamId?: number;
  leagueId?: number;
  createdAt?: string;
  updatedAt?: string; 
}