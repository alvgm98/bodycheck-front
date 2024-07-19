import { Component, output } from '@angular/core';

@Component({
  selector: 'app-modal-overlay',
  standalone: true,
  imports: [],
  template: '',
  styles: [`
    :host {
      background-color:  #00000080;
    }
  `],
  host: {
    'class': 'modal-overlay',
    '(click)': 'close()'
  }
})
export class ModalOverlayComponent {
  closeEvent = output<void>();

  close() {
    this.closeEvent.emit()
  }
}
