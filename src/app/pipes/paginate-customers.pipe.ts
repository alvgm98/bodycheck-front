import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../models/customer';

@Pipe({
  name: 'paginateCustomers',
  standalone: true
})
export class PaginateCustomersPipe implements PipeTransform {

  transform(customers: Customer[], pageSize: number, page: number): Customer[] {
    const startIndex = page * pageSize;
    return customers.slice(startIndex, (startIndex + pageSize));
  }

}
