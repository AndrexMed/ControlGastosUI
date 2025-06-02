import { Injectable } from '@angular/core';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root',
})
export class FondoService {
  constructor(private api: ApiService) {}

  getFondos() {
    return this.api.get<any[]>('FondoMonetario');
  }
}
