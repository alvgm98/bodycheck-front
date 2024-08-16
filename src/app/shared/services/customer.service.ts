import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { tap } from 'rxjs';
import { DateUtilService } from './util/date-util.service';
import { Customer, CustomerDetailed } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customersLoading = signal<boolean>(false);
  customersLoaded = false;
  customers = signal<Customer[]>([]);

  constructor(
    private http: HttpClient,
    private dateUtil: DateUtilService
  ) { }

  /* GET ALL */
  loadCustomers(): void {
    if (!this.customersLoading() && !this.customersLoaded) {
      this.customersLoading.set(true);
      this.http.get<Customer[]>(environment.apiCustomerUrl).pipe(
        tap(data => {
          this.customers.set(data);
          this.customersLoaded = true;
          this.customersLoading.set(false);
        }),
      ).subscribe({ error: () => this.customersLoading.set(false) });
    }
  }

  /* GET */
  loadCustomer(id: number) {
    return this.http.get<CustomerDetailed>(`${environment.apiCustomerUrl}/detailed/${id}`)
      .pipe(
        tap(customer =>
          customer.appointments = this.dateUtil.initializeAppointments(customer.appointments!)
        )
      );
  }

  /* POST */
  addCustomer(customer: Customer) {
    return this.http.post<Customer>(environment.apiCustomerUrl, customer)
      .pipe(
        // Añadimos el customer a customers
        tap(data => this.customers.set([...this.customers(), data])),
      );
  }

  /* PUT */
  updateCustomer(customer: Customer) {
    return this.http.put<Customer>(`${environment.apiCustomerUrl}/${customer.id}`, customer)
      .pipe(
        // Actualizamos el customer actualizado en customers
        tap(updatedCustomer =>
          this.customers.update(customers =>
            customers.map(c =>
              c.id === updatedCustomer.id ? updatedCustomer : c))
        )
      );
  }
}
