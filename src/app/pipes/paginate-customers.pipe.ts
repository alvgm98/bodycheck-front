import { Pipe, PipeTransform } from '@angular/core';
import { Customer, CustomerKey } from '../models/customer';

@Pipe({
  name: 'paginateCustomers',
  standalone: true
})
export class PaginateCustomersPipe implements PipeTransform {

  transform(customers: Customer[], pageSize: number, page: number, sortField: CustomerKey, sortOrder: string): Customer[] {
    let sortedCustomers = []
    if (sortField === 'id' || !customers) {
      sortedCustomers = customers;
    }

    sortedCustomers = customers.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Las string las compararemos en minusculas
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    const startIndex = page * pageSize;
    return sortedCustomers.slice(startIndex, (startIndex + pageSize));
  }

}
