import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddhelperComponent } from './addhelper/addhelper.component';
import { EditHelperComponent } from './edit-helper/edit-helper.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { adminGuard } from './guards/admin.guard';
import { userGuard } from './guards/user.guard';
export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'add-helper',
        component:AddhelperComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'edit-helper/:id',
        component:EditHelperComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'login',
        component:LoginComponent,
    },
    {
        path:'admin',
        component:AdminComponent,
        canActivate: [AuthGuard,adminGuard]
    },
    {
        path:'user',
        component:UserComponent,
        canActivate: [AuthGuard,userGuard]
    },
    {
        path:'**',
        redirectTo:'',
        canActivate: [AuthGuard]
    }

];
