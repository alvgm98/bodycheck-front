import { Component, output } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  host: {
    'class': 'pop-in-settings'
  }
})
export class SettingsComponent {

  logoutEvent = output<void>();

  logout() {
    this.logoutEvent.emit()
  }
}
