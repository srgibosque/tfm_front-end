import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { League } from '../../../League/models/league.interface';
import { Team } from '../../../Team/models/team.interface';

@Component({
  selector: 'app-more-options-modal',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './more-options-modal.component.html',
  styleUrl: './more-options-modal.component.scss'
})
export class MoreOptionsModalComponent {
  @Input() team?: Team;
  @Input() league?: League;
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onDelete() {
   this.delete.emit();
  }

  onEdit() {
    this.delete.emit();
   }
}
