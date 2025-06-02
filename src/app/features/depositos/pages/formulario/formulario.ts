import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FondoService } from '../../../../core/services/fondo-service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { DepositoService } from '../../../../core/services/deposito-service';
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
  imports: [...MATERIAL_MODULES, FormsModule, CurrencyPipe, DatePipe],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss',
})
export class Formulario {
  fondoMonetarioService = inject(FondoService);
  depositoService = inject(DepositoService);

  fecha: Date = new Date();

  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();

  fondoMonetarioId!: number;
  monto: number = 0;
  fondos: any[] = [];
  depositos: any[] = [];
  displayedColumns: string[] = [
    'fecha',
    'nombreFondoMonetario',
    'monto',
    'acciones',
  ];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getFondos();
    const hoy = new Date();

    this.fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    this.fechaFin = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

    this.getDepositos();
  }

  guardarDeposito() {
    if (this.fondoMonetarioId && this.monto > 0) {
      const deposito = {
        fecha: this.fecha,
        fondoMonetarioId: this.fondoMonetarioId,
        monto: this.monto,
      };

      this.depositoService
        .registrarDeposito(deposito)
        .subscribe(() => this.getDepositos());
    } else {
      this.snackBar.open(
        'Debe seleccionar un fondo monetario y un monto mayor a 0',
        'Cerrar',
        {
          duration: 3000,
          panelClass: ['error-snackbar'],
        }
      );
    }
  }

  getFondos() {
    this.fondoMonetarioService.getFondos().subscribe((fondos) => {
      this.fondos = fondos;
    });
  }

  getDepositos() {
    this.depositoService
      .getAllDepositos(this.fechaInicio, this.fechaFin)
      .subscribe((depositos) => {
        this.depositos = depositos;
      });
  }
}
