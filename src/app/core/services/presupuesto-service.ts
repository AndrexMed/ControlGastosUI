import { inject, Injectable } from '@angular/core';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root',
})
export class PresupuestoService {
  private apiService = inject(ApiService);

  getAll(mes: string) {
    return this.apiService.get<any[]>(`Presupuesto/GetallPresupuesto`, {
      mes,
    });
  }

  create(presupuesto: any) {
    return this.apiService.post('Presupuesto', presupuesto);
  }
}
