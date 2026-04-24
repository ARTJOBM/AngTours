import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ToursComponent } from './pages/tours/tours.component';
import { OrderComponent } from './pages/order/order.component';
import { BasketComponent } from './pages/basket/basket.component'; // 1. Импортируйте компонент корзины

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ToursComponent }, 



      { path: 'cart', component: BasketComponent }, 

      { path: 'orders', component: OrderComponent }, // это на список заказов

      {
        path: 'tours',
        children: [
          { path: '', component: ToursComponent }, 
          { path: 'order/:id', component: OrderComponent }, 
        ],
      },

      {
        path: 'tour/:id',
        loadComponent: () => import('./pages/tour-item/tour-item.component').then(c => c.TourItemComponent)
      },

      
      { path: 'order/:id', component: OrderComponent },

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

  { path: '**', redirectTo: '' }, 
];
