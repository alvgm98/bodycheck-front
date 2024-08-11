import { Component, effect, ElementRef } from '@angular/core';
import { RegisterComponent } from '../../../auth/components/register/register.component';
import { AuthService } from '../../../auth/services/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RegisterComponent, ReactiveFormsModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

  showRegister: boolean = false;

  constructor(
    private el: ElementRef,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    effect(() => {
      if (authService.showRegister()) {
        this.showRegisterFn()
      }
      if (!authService.showRegister() && this.showRegister) {
        this.hideRegister();
      }
    })
  }

  /* Mostrar y Ocultar Formulario de Registro */
  showRegisterFn() {
    if (!this.showRegister) {
      const welcome = this.el.nativeElement.querySelector("#welcome");
      welcome.classList.remove("pop-in-welcome");
      welcome.classList.add("pop-out-welcome");
    }

    requestAnimationFrame(() => this.showRegister = true);
  }
  showRegisterFromWelcome() { // Necesario para poder actualizar estado de showRegister desde Home
    this.authService.showRegister.set(true);
  }
  hideRegister() {
    const registerModal = this.el.nativeElement.querySelector("#register-modal");
    registerModal.classList.remove("pop-in-register");
    registerModal.classList.add("pop-out-register");

    const welcome = this.el.nativeElement.querySelector("#welcome");
    welcome.classList.remove("pop-out-welcome");
    welcome.classList.add("pop-in-welcome");

    setTimeout(() => {
      requestAnimationFrame(() => this.showRegister = false);
    }, 600)
  }

  welcomeForm = this.fb.group({
    username: [""]
  })
  get username(): string {
    return this.welcomeForm.get('username')?.value || '';
  }
}
