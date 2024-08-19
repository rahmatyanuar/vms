import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./user.component').then(m => m.UserComponent),
    data: {
      title:`User`
    }
  }
];

