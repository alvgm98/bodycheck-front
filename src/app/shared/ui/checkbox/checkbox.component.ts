import { Component, model } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  host: {
    '(click)': 'check()'
  }
})
export class CheckboxComponent {
  checked = model<boolean>(true);

  check() {
    this.checked.set(!this.checked());
  }
}
