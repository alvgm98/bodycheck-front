import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Este servicio emitirá señales con mensajes de error, éxito e información.
 */
export class MessageService {

  errorMessage = signal<string>("");
  successMessage = signal<string>("");
  infoMessage = signal<string>("");

  emitError(message: string) {
    this.errorMessage.set(message);
    setTimeout(() => this.errorMessage.set(''), 500) // Dejamos un retardo corto para resetear el mensaje
  }

  emitSuccess(message: string) {
    this.successMessage.set(message);
    setTimeout(() => this.successMessage.set(''), 500) // Dejamos un retardo corto para resetear el mensaje
  }

  emitInfo(message: string) {
    this.infoMessage.set(message);
    setTimeout(() => this.infoMessage.set(''), 500)
  }
}
