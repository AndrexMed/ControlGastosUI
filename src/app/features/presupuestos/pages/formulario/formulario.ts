import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { TipoGastoService } from '../../../../core/services/tipo-gasto-service';
import { PresupuestoService } from '../../../../core/services/presupuesto-service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatDatepickerModule,
  MatButtonModule,
  MatNativeDateModule,
  MatIcon,
];

@Component({
  selector: 'app-formulario',
  imports: [
    ...MATERIAL_MODULES,
    FormsModule,
    CurrencyPipe,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss',
})
export class Formulario {
  mesSeleccionado: Date = new Date();
  tipoGastoId: number | null = null;
  monto: number = 0;

  tiposGasto: any[] = [];
  presupuestos: any[] = [];
  columnas: string[] = [
    'tipoGastoId',
    'tipo',
    'monto',
    'mes',
    'anio',
    'acciones',
  ];

  private presupuestoService = inject(PresupuestoService);
  private tipoGastoSvc = inject(TipoGastoService);

  constructor(private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.obtenerTiposGasto();
    this.cargarPresupuestos();
  }

  obtenerTiposGasto() {
    this.tipoGastoSvc.getAll().subscribe({
      next: (res) => (this.tiposGasto = res),
    });
  }

  cargarPresupuestos() {
    const mes = this.obtenerMesString(this.mesSeleccionado);
    this.presupuestoService.getAll(mes).subscribe({
      next: (res) => {
        this.presupuestos = res;
      },
    });
  }

  guardarPresupuesto() {
    if (!this.tipoGastoId || !this.mesSeleccionado) {
      this.snack.open('Por favor, complete todos los campos.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    const payload = {
      tipoGastoId: this.tipoGastoId,
      mes: this.mesSeleccionado.getMonth() + 1, // 1-based
      anio: this.mesSeleccionado.getFullYear(),
      monto: this.monto,
    };

    this.presupuestoService.create(payload).subscribe({
      next: () => {
        this.cargarPresupuestos();
        this.tipoGastoId = null;
        this.monto = 0;
      },
      error: (err) => {
        console.error('Error al guardar el presupuesto:', err);
      },
    });
  }

  obtenerMesString(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}`;
  }

  soloMeses = (d: Date | null): boolean => {
    return !!d;
  };
}
