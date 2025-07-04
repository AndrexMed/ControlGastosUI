import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { GastoService } from '../../../../core/services/gasto-service';
import { CommonModule } from '@angular/common';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FondoService } from '../../../../core/services/fondo-service';
import { TipoGastoService } from '../../../../core/services/tipo-gasto-service';
import { forkJoin } from 'rxjs';
import { SobregiroDialog } from './sobregiro-dialog/sobregiro-dialog';

const MATERIAL_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatSelectModule,
  MatIconModule,
  MatNativeDateModule,
  MatButtonModule,
];

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule, CommonModule, ...MATERIAL_MODULES],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss',
  providers: [provideNativeDateAdapter()],
})
export class Formulario {
  form: FormGroup;
  tiposGasto: any = [];
  fondos: any = [];

  constructor(
    private fb: FormBuilder,
    private gastoService: GastoService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private fondoService: FondoService,
    private tipoGastoService: TipoGastoService
  ) {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      fondoMonetarioId: [null, Validators.required],
      observaciones: [''],
      nombreComercio: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      detalles: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.agregarDetalle(); // Inicializa con una línea
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales() {
    forkJoin({
      fondos: this.fondoService.getFondos(),
      tipos: this.tipoGastoService.getAll(),
    }).subscribe({
      next: ({ fondos, tipos }) => {
        this.fondos = fondos;
        this.tiposGasto = tipos;
      },
      error: () => {
        this.snack.open('Error al cargar datos iniciales ❌', '', {
          duration: 3000,
        });
      },
    });
  }

  get detalles() {
    return this.form.get('detalles') as FormArray;
  }

  agregarDetalle() {
    this.detalles.push(
      this.fb.group({
        tipoGastoId: ['', Validators.required],
        monto: [0, [Validators.required, Validators.min(1)]],
      })
    );
  }

  eliminarDetalle(index: number) {
    this.detalles.removeAt(index);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snack.open(
        'Por favor, completa todos los campos obligatorios ❗',
        '',
        {
          duration: 3000,
        }
      );
      return;
    }

    this.gastoService.registrarGasto(this.form.value).subscribe({
      next: (res: any) => {
        if (res.resultado?.tieneSobregiro) {
          const alertas = res.resultado.alertas
            .map(
              (a: any) =>
                `Gasto tipo ${a.tipoGastoId}: Presupuesto ${a.presupuesto}, Ejecutado ${a.ejecutado}`
            )
            .join('\n');
          // alert('⚠️ Sobregiro detectado:\n' + alertas);
          this.dialog.open(SobregiroDialog, {
            data: { alertas },
          });
        } else {
          this.snack.open('Gasto registrado con éxito ✅', '', {
            duration: 3000,
          });
        }
        this.form.reset();
        this.detalles.clear();
        this.agregarDetalle();
      },
      error: () =>
        this.snack.open('Error al registrar gasto ❌', '', { duration: 3000 }),
    });
  }
}
