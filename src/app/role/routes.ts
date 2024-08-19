import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./role.component').then(m => m.RoleComponent),
    data: {
      title:`Role`
    }
  }
];

