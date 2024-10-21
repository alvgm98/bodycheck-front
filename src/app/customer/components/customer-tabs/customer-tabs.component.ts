import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-tabs',
  standalone: true,
  imports: [NgClass],
  templateUrl: './customer-tabs.component.html',
  styleUrl: './customer-tabs.component.scss'
})
export class CustomerTabsComponent {
  tabOpened: string = 'summary';
}
