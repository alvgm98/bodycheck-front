import { Component, output } from '@angular/core';

@Component({
  selector: 'app-modal-overlay',
  standalone: true,
  imports: [],
  template: '',
  styles: [`
    :host {
      z-index: 4;
      background-color:  #00000030;
    }
  `],
  host: {
    'class': 'modal-overlay overlay-fade-in-animation',
    '(click)': 'close()'
  }
})
export class ModalOverlayComponent {
  closeEvent = output<void>();

  close() {
    this.closeEvent.emit()
  }
}
