import { Component, Input } from '@angular/core';
import { Team } from '../../../Team/models/team.interface';
import { League } from '../../../League/models/league.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation-card.component.html',
  styleUrl: './navigation-card.component.scss'
})
export class NavigationCardComponent {
  @Input() team!: Team | null;
  @Input() league!: League | null;
}
