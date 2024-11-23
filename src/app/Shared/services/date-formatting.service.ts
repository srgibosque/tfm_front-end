import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormattingService {

  constructor() {}

  
  formatDateToInput(dateString: string | null | undefined): string {
    if (!dateString){
      return '';
    }
    const date = new Date(dateString);
    return !isNaN(date.getTime())
    ? date.toISOString().split('T')[0]
    : '';
  }  
}
