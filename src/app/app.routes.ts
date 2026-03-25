import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { ToursComponent } from './pages/tours/tours.component';

export const routes: Routes = [
 
    {path: '', component: LayoutComponent, children: [{ path: '', component: ToursComponent }, 
        
    {path: 'settings', loadComponent: () => import('./pages/settings/settings.component').then(c => c.SettingsComponent)},
    {path: 'auth', loadComponent: () => import('./pages/auth/auth.component').then(c => c.AuthComponent) },
    {path: 'tour/:id', loadComponent: () => import('./pages/tour-item/tour-item.component').then(c => c.TourItemComponent) },
    {path: 'order/:id', loadComponent: () => import('./pages/order/order.component').then(c => c.OrderComponent)},]},

     {path: '**', component: ToursComponent,},
];
