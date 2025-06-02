import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  formatDateOnly(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
