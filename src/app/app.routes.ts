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
    path: 'listado-presupuestos',
    loadComponent: () =>
      import('./features/presupuestos/pages/listado/listado').then(
        (m) => m.Listado
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
    path: 'crear-gasto',
    loadComponent: () =>
      import('./features/gastos/pages/formulario/formulario').then(
        (m) => m.Formulario
      ),
  },
];
