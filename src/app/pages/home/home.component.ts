import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { RegisterComponent } from '../../auth/components/register/register.component';
import { AuthService } from '../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  showRegister: boolean = false;
  private showRegisterSubscription!: Subscription;

  constructor(
    private el: ElementRef,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.showRegister.subscribe(
      (showRegister: boolean) => {
        if (showRegister) {
          this.showRegisterFn();
        }
        if (!showRegister && this.showRegister) {
          this.hideRegister();
        }
      }
    )
  }
  ngOnDestroy(): void {
    if (this.showRegisterSubscription) {
      this.showRegisterSubscription.unsubscribe();
    }
  }

  /* Mostrar y Ocultar Formulario de Registro */
  showRegisterFn() {
    const welcome = this.el.nativeElement.querySelector("#welcome");
    welcome.classList.remove("pop-in-welcome");
    welcome.classList.add("pop-out-welcome");

    this.showRegister = true;
  }
  showRegisterFromWelcome() { // Necesario para poder actualizar estado de showRegister desde Home
    this.authService.showRegister.next(true);
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
