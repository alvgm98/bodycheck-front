import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../models/customer';

@Pipe({
  name: 'filterCustomers',
  standalone: true
})
export class FilterCustomersPipe implements PipeTransform {

  transform(customers: Customer[], condition: string): Customer[] {
    if (!condition) {
      return customers;
    }

    if (customers.length === 0) {
      return [];
    }

    return customers.filter(customer => (customer.firstName + " " + customer.lastName).toLocaleLowerCase().includes(condition.toLocaleLowerCase()));

  }

}
