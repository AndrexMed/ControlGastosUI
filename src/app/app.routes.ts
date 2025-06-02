import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'crear-gasto',
    loadComponent: () =>
      import('./features/gastos/pages/formulario/formulario').then(
        (m) => m.Formulario
      ),
  },
  {
    path: 'crear-deposito',
    loadComponent: () =>
      import('./features/depositos/pages/formulario/formulario').then(
        (m) => m.Formulario
      ),
  },
  {
    path: 'crear-presupuesto',
    loadComponent: () =>
      import('./features/presupuestos/pages/formulario/formulario').then(
        (m) => m.Formulario
      ),
  },

  {
    path: 'listado-gastos',
    loadComponent: () =>
      import('./features/gastos/pages/listado/listado').then((m) => m.Listado),
  },
  {
    path: 'grafico-comparativo',
    loadComponent: () =>
      import(
        './features/graficos/pages/grafico-comparativo/grafico-comparativo'
      ).then((m) => m.GraficoComparativo),
  },
];
