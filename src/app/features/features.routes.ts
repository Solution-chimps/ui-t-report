import { Routes } from '@angular/router';

import { Document } from './document/document';
import { Documents } from './documents/documents';
import { Home } from './home/home';

export const features: Routes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'documents'
      },
      {
        path: 'documents',
        component: Documents
      },
      {
        path: 'document',
        component: Document
      }
    ]
  }
];
