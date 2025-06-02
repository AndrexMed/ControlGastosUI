import { Injectable } from '@angular/core';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root',
})
export class GastoService {
  constructor(private api: ApiService) {}

  registrarGasto(data: any) {
    return this.api.post('Gastos/registrar', data);
  }

  getGastos(fechaInicio: Date, fechaFin: Date) {
    const params = {
      fechaInicio: this.formatDateOnly(fechaInicio),
      fechaFin: this.formatDateOnly(fechaFin),
    };
    return this.api.get<any[]>('Gastos/movimientos', params);
  }

  formatDateOnly(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
