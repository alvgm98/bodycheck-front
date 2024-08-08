import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, input, output } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [],
  template: `{{message()}}`,
  styleUrl: './message-modal.component.scss',
  animations: [
    trigger('message-animation', [
      state('open', style({ bottom: '60px', opacity: 1 })),
      state('closed', style({ opacity: 0 })),
      transition('* => open', animate('300ms ease-in')),
      transition('open => closed', animate('300ms ease-out')),
    ])
  ],
  host: {
    '[@message-animation]': 'animationState',
    '(click)': 'close()'
  }
})
export class MessageModalComponent {
  animationState = 'open';
  message = input.required<string>();
  messageType = input.required<string>();

  @HostBinding('style.backgroundColor') get backgroundColor() {
    return  this.messageType() == 'error'   ? '#ef233cb0' :
            this.messageType() == 'success' ? '#109d8ab0' :
            this.messageType() == 'info'    ? '#0077b6b0' :
                                              '#adb5bdcb';
  }

  closeEvent = output<void>();
  closeTimeout: NodeJS.Timeout;

  constructor() {
    this.closeTimeout = setTimeout(() => {
      this.close();
    }, 4000);
  }

  close() {
    clearTimeout(this.closeTimeout); // Limpiamos el Timeout del constructor por para evitar el error si esta funcion se ejecuta mendiante (click)

    this.animationState = 'closed';
    setTimeout(() => {
      this.closeEvent.emit();
    }, 300)
  }
}
