import { Component, Input } from '@angular/core';
import { Match } from '../../models/match.interface';
import { Team } from '../../../Team/models/team.interface';
import { RouterModule } from '@angular/router';
import { DateTimeFormatterPipe } from '../../../Shared/pipes/date-time-formatter.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-card',
  standalone: true,
  imports: [CommonModule, RouterModule, DateTimeFormatterPipe],
  templateUrl: './match-card.component.html',
  styleUrl: './match-card.component.scss'
})
export class MatchCardComponent {
  @Input() match!: Match;
  @Input() teams: Team[] | null = [];

  getTeamName(teamId: number | undefined): string {
    if(!teamId){
      return 'Team not defined';
    }
    const team = this.teams?.find((t) => t.id === teamId);
    return team ? team.name : 'Team not defined';
  }
}
