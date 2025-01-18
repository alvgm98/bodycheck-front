import { Component, effect, ElementRef, Renderer2 } from '@angular/core';
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
    private renderer: Renderer2,
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
      this.renderer.removeClass(welcome, "pop-in-welcome");
      this.renderer.addClass(welcome, "pop-out-welcome");
    }

    requestAnimationFrame(() => this.showRegister = true);
  }
  showRegisterFromWelcome() { // Necesario para poder actualizar estado de showRegister desde Home
    this.authService.showRegister.set(true);
  }
  hideRegister() {
    const registerModal = this.el.nativeElement.querySelector("#register-modal");
    this.renderer.removeClass(registerModal, "pop-in-register");
    this.renderer.addClass(registerModal, "pop-out-register");

    const welcome = this.el.nativeElement.querySelector("#welcome");
    this.renderer.removeClass(welcome, "pop-out-welcome");
    this.renderer.addClass(welcome, "pop-in-welcome");

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
