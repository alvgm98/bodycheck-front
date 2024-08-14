import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, effect } from '@angular/core';
import { ModalService } from '../../services/util/modal.service';

@Component({
  selector: 'app-modal-overlay',
  standalone: true,
  imports: [],
  template: '',
  styles: [`
    :host {
      z-index: 4;
      background-color: #000000;
      opacity: 0;
    }
  `],
  animations: [
    trigger('overlay-animation', [
      state('open', style({ opacity: .2 })),
      state('closed', style({ opacity: 0 })),
      transition('* => open, open => closed', animate('300ms'))
    ])
  ],
  host: {
    '[@overlay-animation]': 'animationState',
    'class': 'modal-overlay',
    '(click)': 'close()'
  }
})
/**
 * Esta clase tiene una animación cuando abre y cuando se cierra el componente,
 * al ejecutar la animacion de cerrar actualiza los signals de ModalService, pero el componente no se destruye.
 *
 * Para usar correctamente este componente, debes subscribirte a los signals de ModalService
 * en el componente padre y ejecutar la destruccion del componente pasados 300ms de que el modal correspondiente torne a false.
 */
export class ModalOverlayComponent {
  animationState: string = 'open';

  constructor(private modalService: ModalService) {
    effect(() => this.animationState = modalService.showOverlay() ? 'open' : 'closed')
  }

  close() {
    this.modalService.closeAll();
  }
}
