import { Component, output } from '@angular/core';
import { Router } from '@angular/router';

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
  closeEvent = output<void>();

  constructor(private router: Router) { }

  closeSettings() {
    this.closeEvent.emit();
  }

  backToDashboard() {
    this.router.navigateByUrl("app");
  }

  logout() {
    this.logoutEvent.emit()
  }
}
