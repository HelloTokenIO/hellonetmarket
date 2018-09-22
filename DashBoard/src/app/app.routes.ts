import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';

export const Approute:Routes = [

    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'user',
        component: UserComponent
    }
];

