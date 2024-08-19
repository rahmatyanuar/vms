import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./recognition.component').then(m => m.RecognitionComponent),
    data: {
      title:`Recognize`
    }
  }
];

