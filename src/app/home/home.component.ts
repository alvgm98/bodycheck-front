import { Component, effect, ElementRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from '../auth/components/register/register.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent, ReactiveFormsModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

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
    const welcome = this.el.nativeElement.querySelector("#welcome");
    welcome.classList.remove("pop-in-welcome");
    welcome.classList.add("pop-out-welcome");

    this.showRegister = true;
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
      this.showRegister = false;
    }, 1000)
  }

  /* Formulario de Welcome */
  welcomeForm = this.fb.group({
    username: [""]
  })
  get username(): string {
    return this.welcomeForm.get('username')?.value || '';
  }
}
