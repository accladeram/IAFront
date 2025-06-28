
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./components/auth-component/auth-component').then(m => m.AuthComponent) }
];
