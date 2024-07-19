import { Component, output } from '@angular/core';

@Component({
  selector: 'app-modal-overlay',
  standalone: true,
  imports: [],
  template: '',
  styleUrl: './modal-overlay.component.scss',
  host: {
    '(click)': 'close()'
  }
})
export class ModalOverlayComponent {
  closeEvent = output<void>();

  close() {
    this.closeEvent.emit()
  }
}
