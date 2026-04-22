import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ToursComponent } from './pages/tours/tours.component';
import { OrderComponent } from './pages/order/order.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ToursComponent },
      {
        path: 'tours',
        children: [
          { path: '', component: ToursComponent }, // базовый путь /tours
          { path: 'order/:id', component: OrderComponent }, // путь /tours/order/:id
        ],
      },
      {
        path: 'tour/:id',
        loadComponent: () => import('./pages/tour-item/tour-item.component').then(c => c.TourItemComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component').then(c => c.SettingsComponent)
      },
      {
        path: 'auth',
        loadComponent: () => import('./pages/auth/auth.component').then(c => c.AuthComponent)
      },
    ],
  },
  { path: '**', redirectTo: '' }, // редирект на главную для неизвестных путей
];
