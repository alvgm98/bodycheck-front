import { Component, ElementRef, input, output } from '@angular/core';

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

  selectEvent = output<string>();

  constructor(private el: ElementRef) { }

  selectLeft() {
    const toggleBar = this.el.nativeElement.querySelector(".toggle-bar")
    toggleBar.style.left = '0';

    this.selectEvent.emit(this.leftBtn());
  }
  selectRight() {
    const toggleBar = this.el.nativeElement.querySelector(".toggle-bar")
    toggleBar.style.left = '50%';

    this.selectEvent.emit(this.rightBtn());
  }
}
