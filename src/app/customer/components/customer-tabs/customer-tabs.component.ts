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

  changeTab(tab: string) {
    this.tabOpened = tab;

    // TODO abrir el tab en CustomerComponent
  }
}
