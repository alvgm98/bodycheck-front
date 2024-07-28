import { Component, output } from '@angular/core';

@Component({
  selector: 'app-modal-overlay',
  standalone: true,
  imports: [],
  template: '',
  styles: [`
    :host {
      z-index: 4;
      background-color:  #00000080;
      animation: overlay-fade-in .5s;
    }

    @keyframes overlay-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
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
