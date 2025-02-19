import { Routes } from '@angular/router';
import { LayoutComponent } from './Shared/components/layout/layout.component';
import { HomeComponent } from './Pages/home/home.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                pathMatch: 'full'
            },
            {
                path: 'create',
                loadComponent: () =>
                    import('../app/Pages/create-house/create-house.component').then(m => m.CreateHouseComponent),
                canActivate:[authGuard]
            },
            {
                path: 'edit/:id',
                loadComponent: () =>
                    import('../app/Pages/update-house/update-house.component').then(m => m.UpdateHouseComponent),
                canActivate:[authGuard]
            }
        ]
    }
];