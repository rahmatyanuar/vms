import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./floor.component').then(m => m.FloorComponent),
    data: {
      title:`Floor`
    }
  }
];

