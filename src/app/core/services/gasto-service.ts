import { inject, Injectable } from '@angular/core';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root',
})
export class GastoService {
  private apiService = inject(ApiService);

  registrarGasto(data: any) {
    return this.apiService.post('Gastos/registrar', data);
  }

  getGastos(fechaInicio: Date, fechaFin: Date) {
    const params = {
      fechaInicio: this.formatDateOnly(fechaInicio),
      fechaFin: this.formatDateOnly(fechaFin),
    };
    return this.apiService.get<any[]>('Gastos/movimientos', params);
  }

  formatDateOnly(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
