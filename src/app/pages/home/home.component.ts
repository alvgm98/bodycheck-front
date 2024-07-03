import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { RegisterComponent } from '../../auth/components/register/register.component';
import { AuthService } from '../../auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  showRegister: boolean = false;
  private showRegisterSubscription!: Subscription;

  constructor(
    private el: ElementRef,
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

  showRegisterFn() {
    const welcome = this.el.nativeElement.querySelector("#welcome");
    welcome.classList.remove("pop-in-welcome");
    welcome.classList.add("pop-out-welcome");

    this.showRegister = true;
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
}
