import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Customer, CustomerDetailed } from '../models/customer';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customersLoading = signal<boolean>(false);
  customersLoaded = false;
  customers = signal<Customer[]>([]);

  constructor(private http: HttpClient) { }

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

  loadCustomer(id: number) {
    return this.http.get<CustomerDetailed>(`${environment.apiCustomerUrl}/detailed/${id}`);
  }

  addCustomer(customer: Customer) {
    this.http.post<Customer>(environment.apiCustomerUrl, customer).pipe(
      tap(data => this.customers.set([...this.customers(), data])),
    ).subscribe();
  }
}
