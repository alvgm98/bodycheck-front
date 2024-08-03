import { Component, input, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-detailed',
  standalone: true,
  imports: [],
  templateUrl: './customer-detailed.component.html',
  styleUrl: './customer-detailed.component.scss'
})
export class CustomerDetailedComponent implements OnInit{

  customerId = input();

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    console.log(this.customerId())
  }

}
