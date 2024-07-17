import { Pipe, PipeTransform } from '@angular/core';
import { Customer, CustomerKey } from '../models/customer';

@Pipe({
  name: 'sortCustomers',
  standalone: true
})
export class SortCustomersPipe implements PipeTransform {

  transform(customers: Customer[], field: CustomerKey, order: string): Customer[] {
    if (field === 'id' || !customers) {
      return customers;
    }

    return customers.sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      // Las string las compararemos en minusculas
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

}
