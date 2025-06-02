import { inject, Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { HelperService } from '../../shared/services/helper-service';

@Injectable({
  providedIn: 'root',
})
export class DepositoService {
  private apiService = inject(ApiService);
  private helperService = inject(HelperService);

  getAllDepositos(fechaInicio: Date, fechaFin: Date) {
    const params = {
      fechaInicio: this.helperService.formatDateOnly(fechaInicio),
      fechaFin: this.helperService.formatDateOnly(fechaFin),
    };

    return this.apiService.get<any[]>('Deposito', params);
  }

  registrarDeposito(deposito: any) {
    return this.apiService.post<any>('Deposito/registrar-deposito', deposito);
  }
}
