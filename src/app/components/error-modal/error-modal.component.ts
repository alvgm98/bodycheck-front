import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [],
  template: `{{errorMessage()}}`,
  styleUrl: './error-modal.component.scss',
  animations: [
    trigger('errorAnimation', [
      state('open', style({ bottom: '60px', opacity: 1 })),
      state('closed', style({ opacity: 0 })),
      transition('* => open', animate('300ms ease-in')),
      transition('open => closed', animate('300ms ease-out')),
    ])
  ],
  host: {
    '[@errorAnimation]': 'animationState',
    '(click)': 'close()'
  }
})
export class ErrorModalComponent {
  animationState = 'open';
  errorMessage = input.required<string>()

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
