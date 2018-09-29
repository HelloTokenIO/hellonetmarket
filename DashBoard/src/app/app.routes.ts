import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { DatatableComponent } from './datatable/datatable.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

export const Approute:Routes = [

    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'datatable',
        component: DatatableComponent
    },
    {
        path: 'user',
        component: UserComponent
    },    
    {
        path: 'userprofile',
        component: UserprofileComponent
    }
];

