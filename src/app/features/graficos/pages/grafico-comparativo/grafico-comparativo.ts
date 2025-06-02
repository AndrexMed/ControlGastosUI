import { Component, inject } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { GraficosService } from '../../../../core/services/graficos-service';
import { MatCardModule } from '@angular/material/card';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import {
  MatDatepickerModule,
  MatDateRangeInput,
} from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
Chart.register(ChartDataLabels);

const MATERIAL_MODULES = [
  NgChartsModule,
  MatCardModule,
  MatFormField,
  MatLabel,
  MatDateRangeInput,
  MatDatepickerModule,
  MatInputModule,
  MatButtonModule
];

@Component({
  selector: 'app-grafico-comparativo',
  imports: [CommonModule, FormsModule, ...MATERIAL_MODULES],
  templateUrl: './grafico-comparativo.html',
  styleUrl: './grafico-comparativo.scss',
  providers: [provideNativeDateAdapter()],
})
export class GraficoComparativo {
  fechaInicio!: Date;
  fechaFin!: Date;

  public barChartOptions: ChartOptions = {
    indexAxis: 'x',
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Presupuesto vs Ejecución' },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
  };

  public barChartLabels: string[] = [];
  public barChartType: any = 'bar';
  public barChartData: { data: number[]; label: string }[] = [
    { data: [], label: 'Presupuestado' },
    { data: [], label: 'Ejecutado' },
  ];

  private graficosService = inject(GraficosService);

  ngOnInit(): void {
    const hoy = new Date();
    this.fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    this.fechaFin = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

    this.cargarDatos();
  }

  cargarDatos(): void {
    this.graficosService
      .getComparativoGastos(this.fechaInicio, this.fechaFin)
      .subscribe((data) => {
        this.barChartLabels = data.map((item) => item.nombreTipoGasto);
        this.barChartData[0].data = data.map((item) => item.presupuesto);
        this.barChartData[1].data = data.map((item) => item.ejecutado);
      });
  }
}
