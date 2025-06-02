import { inject, Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { HelperService } from '../../shared/services/helper-service';

@Injectable({
  providedIn: 'root',
})
export class GraficosService {
  private apiService = inject(ApiService);
  private helperService = inject(HelperService);

  public getComparativoGastos(fechaInicio: Date, fechaFin: Date) {
    const params = {
      fechaInicio: this.helperService.formatDateOnly(fechaInicio),
      fechaFin: this.helperService.formatDateOnly(fechaFin),
    };
    return this.apiService.get<any[]>('Graficos/comparativo', params);
  }
}
