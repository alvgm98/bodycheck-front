import { Component } from '@angular/core';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { AgendaComponent } from './components/agenda/agenda.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CustomerListComponent, DatePickerComponent, AgendaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
