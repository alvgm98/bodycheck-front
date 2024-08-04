import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Customer, CustomerDetailed } from '../models/customer';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  loading = signal<boolean>(false);
  customersLoaded = false;
  customers = signal<Customer[]>([]);

  constructor(private http: HttpClient) { }

  loadCustomers(): void {
    if (!this.loading() && !this.customersLoaded) {
      this.loading.set(true);
      this.http.get<Customer[]>(environment.apiCustomerUrl).pipe(
        tap(data => {
          this.customers.set(data);
          this.customersLoaded = true;
          this.loading.set(false);
        }),
      ).subscribe({ error: () => this.loading.set(false) });
    }
  }

  loadCustomer(id: number) {
    return this.http.get<CustomerDetailed>(`${environment.apiCustomerUrl}/detailed/${id}`);
  }

  addCustomer(customer: Customer) {
    this.http.post<Customer>(environment.apiCustomerUrl, customer).pipe(
      tap(data => this.customers.set([...this.customers(), data])),
    ).subscribe();
  }
}
