import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Customer } from '../models/customer';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  loading = false;
  customersLoaded = false;
  customers = signal<Customer[]>([]);

  constructor(private http: HttpClient) { }

  loadCustomers(): void {
    if (!this.loading && !this.customersLoaded) {
      this.loading = true;
      this.http.get<Customer[]>(environment.apiCustomerUrl).pipe(
        tap(data => {
          this.customers.set(data);
          this.customersLoaded = true;
        }),
      ).subscribe();
      this.loading = false;
    }
  }

  addCustomer(customer: Customer) {
    this.http.post<Customer>(environment.apiCustomerUrl, customer).pipe(
      tap(data => this.customers.set([...this.customers(), data])),
    ).subscribe();
  }
}
