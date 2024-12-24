import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-back',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-back.component.html',
  styleUrl: './nav-back.component.scss'
})
export class NavBackComponent {
  @Input() text!: string;
}
