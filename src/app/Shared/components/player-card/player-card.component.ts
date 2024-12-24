import { Component, Input } from '@angular/core';
import { User } from '../../../Profile/models/user.interface';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss'
})
export class PlayerCardComponent {
  @Input() player!: User;
}
