import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ocr-registration.component').then(m => m.OcrRegistrationComponent),
    data: {
      title:`Recognize`
    }
  }
];

