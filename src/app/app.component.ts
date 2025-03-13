import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { MessageService } from './message-modal/message.service';
import { MessageModalComponent } from './message-modal/message-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MessageModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  errorMessages: string[] = [];
  successMessages: string[] = [];
  infoMessages: string[] = [];

  constructor(
    private messageService: MessageService
  ) {
    // Subcripciones a mensajes modales
    effect(() => messageService.errorMessage() && this.addErrorMessage(messageService.errorMessage()));
    effect(() => {
      messageService.successMessage() && this.addSuccessMessage(messageService.successMessage())
    })
    effect(() => {
      messageService.infoMessage() && this.addInfoMessage(messageService.infoMessage())
    })
  }

  /* Mensajes Modales */
  addErrorMessage(message: string) {
    this.errorMessages.push(message);
  }
  closeErrorMessage(index: number) {
    this.errorMessages.splice(index);
  }

  addSuccessMessage(message: string) {
    this.successMessages.push(message);
  }
  closeSuccessMessage(index: number) {
    this.successMessages.splice(index);
  }

  addInfoMessage(message: string) {
    this.infoMessages.push(message);
  }
  closeInfoMessage(index: number) {
    this.infoMessages.splice(index);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
