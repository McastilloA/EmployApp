import { Injectable } from '@angular/core';
import { MenuItem } from '@core/interface/menuItem';

@Injectable({
  providedIn: 'root',
})
export class MenuItems {
  menuItems: MenuItem[] = [
    {
      path: 'employees',
      title: 'Employees',
      description: 'Employees Manager',
      icon: 'employees',
    },
    {
      path: 'categories',
      title: 'Categories',
      description: 'Categories Manager',
      icon: 'categories',
    },
    {
      path: 'users',
      title: 'Users',
      description: 'Users Manager',
      icon: 'users',
    },
  ];
}
