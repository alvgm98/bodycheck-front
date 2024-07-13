import { Component, ElementRef, input } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  standalone: true,
  imports: [],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss'
})
export class ToggleButtonComponent {
  leftBtn = input.required<string>()
  rightBtn = input.required<string>()

  constructor(private el: ElementRef) { }

  selectLeft() {
    const toggleBar = this.el.nativeElement.querySelector(".toggle-bar")
    toggleBar.style.left = '0';
  }
  selectRight() {
    const toggleBar = this.el.nativeElement.querySelector(".toggle-bar")

    console.log(toggleBar)

    toggleBar.style.left = '50%';
  }
}
