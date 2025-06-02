import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GastoService } from '../../../../core/services/gasto-service';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatSelectModule,
  MatIconModule,
  MatNativeDateModule,
  MatButtonModule,
  MatTableModule,
];

@Component({
  selector: 'app-listado',
  imports: [...MATERIAL_MODULES, CommonModule, FormsModule],
  templateUrl: './listado.html',
  styleUrl: './listado.scss',
})
export class Listado {
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  movimientos: any[] = [];
  columnas: string[] = [
    'fecha',
    'fondo',
    'observaciones',
    'nombreComercio',
    'tipoDocumento',
    'montoTotal',
    'acciones',
  ];
  busco = false;

  constructor(private gastosSvc: GastoService) {}

  ngOnInit(): void {
    // Inicializamos el rango de fechas: últimos 7 días
    const hoy = new Date();
    const hace7dias = new Date();
    hace7dias.setDate(hoy.getDate() - 7);
    this.fechaInicio = hace7dias;
    this.fechaFin = hoy;

    this.buscarMovimientos();
  }

  buscarMovimientos() {
    if (!this.fechaInicio || !this.fechaFin) return;

    this.gastosSvc.getGastos(this.fechaInicio, this.fechaFin).subscribe({
      next: (data) => {
        this.movimientos = data;
        this.busco = true;
      },
      error: (error) => {
        console.error('Error al obtener los movimientos:', error);
        this.movimientos = [];
        this.busco = false;
      },
    });
  }
}
