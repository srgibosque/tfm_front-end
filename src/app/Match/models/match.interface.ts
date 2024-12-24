export interface Match {
  id?: number;
  name?: string;
  location: string | null;
  date: string | null;
  homeTeamGoals: number | null;
  awayTeamGoals: number | null;
  homeTeamId?: number;
  awayTeamId?: number;
  HomeTeam?: { id: number, name: string }
  AwayTeam?: { id: number, name: string }
  leagueId?: number;
  createdAt?: string;
  updatedAt?: string;
}