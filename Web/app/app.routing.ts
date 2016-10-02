import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { PasswordListComponent } from './password-list.component';

const appRoutes: Routes = [
    {
        path: 'passwords',
        component: PasswordListComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/passwords'
    }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
