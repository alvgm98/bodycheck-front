import { Component, effect, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomerService } from '../../../../services/customer.service';
import { Customer } from '../../../../models/customer';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'email'];
  dataSource!: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {
    this.customerService.loadCustomers();

    effect(() => {
      this.customers = customerService.customers();
      this.dataSource = new MatTableDataSource(this.customers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
