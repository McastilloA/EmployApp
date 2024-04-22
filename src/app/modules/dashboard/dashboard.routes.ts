import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full',
      },
      {
        path: 'employees',
        loadChildren: () => import('./../employees/employees.routes').then((m) => m.routes),
        title: 'Employees'
      },
      {
        path: 'categories',
        loadChildren: () => import('../categories/categories.routes').then((m) => m.routes),
        title: 'Categories',
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.routes').then((m) => m.routes),
        title: 'Users',
      },
    ],
  },
];
