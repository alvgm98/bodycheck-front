import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { homeGuard } from './auth/guards/home.guard';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [homeGuard] },
  { path: 'app', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'app/customer/:customerId', component: CustomerComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'app', pathMatch: 'full' }

];
