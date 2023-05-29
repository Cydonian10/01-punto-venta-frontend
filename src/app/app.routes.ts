import { Routes } from '@angular/router';
import { AdminLayout } from './layout/admin.layout';
import { DashboardPage } from './admin/pages/dashboard.page';

export const routes: Routes = [
    {
        path:"",
        component:AdminLayout,
        children: [
            {
                path:"",
                component:DashboardPage
            }
        ]
    }
];
