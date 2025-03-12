import { NgClass } from '@angular/common';
import { Component, model } from '@angular/core';
import { TABS } from '../../../shared/models/constants/tabs.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-tabs',
  standalone: true,
  imports: [NgClass],
  templateUrl: './customer-tabs.component.html',
  styleUrl: './customer-tabs.component.scss'
})
/**
 * Esta clase será la encargada de navegar a traves de las pages del Customer.
 * Enviando al componente padre en todo momento la pestaña seleccionada.
 */
export class CustomerTabsComponent {
  TABS = TABS;
  tabOpened = model<string>(TABS.SUMMARY);

  constructor(private router: Router) { }

  /** Establece la página a mostrar */
  changeTab(tab: string) {
    this.tabOpened.set(tab);
  }

  backToDashboard() {
    this.router.navigateByUrl("app");
  }
}
