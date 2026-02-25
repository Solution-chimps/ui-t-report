import { Routes } from '@angular/router';

import { authRoutes } from './auth/auth.router';
import { AuthGuard } from './core/auth.guard';
import { features } from './features/features.routes';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => features
  },
  {
    path: 'auth',

    loadChildren: () => authRoutes
  }
];
