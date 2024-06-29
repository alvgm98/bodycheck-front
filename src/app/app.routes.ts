import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './auth/guards/auth.guard';
import { homeGuard } from './auth/guards/home.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [homeGuard] },
  { path: 'app', component: DashboardComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }

];
