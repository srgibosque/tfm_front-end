import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
   set(key: string, value: string): void {
    if (this.isLocalStorageAvailable()){
      localStorage.setItem(key, value);
    } else {
      console.warn('Local Storage is not available');
    }
  }

  get(key: string): string | null {
    if (this.isLocalStorageAvailable()){
      return localStorage.getItem(key);
    }
    console.warn('Local Storage is not available');
    return null;
  }

  remove(key: string): void {
    if (this.isLocalStorageAvailable()){
      localStorage.removeItem(key);
    } else {
      console.warn('Local Storage is not available');
    }
  }
}
