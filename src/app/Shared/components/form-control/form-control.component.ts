import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.scss'
})
export class FormControlComponent {
  @Input() control!: FormControl; 
  @Input() label!: string; 
  @Input() type!: string;
  @Input() placeholder: string = '';
}
