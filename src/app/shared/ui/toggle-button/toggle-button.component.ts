import { Component, ElementRef, input, OnInit, output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  standalone: true,
  imports: [],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss'
})
export class ToggleButtonComponent implements OnInit {
  leftBtn!: {key: string, value: string};
  rightBtn!: {key: string, value: string};

  options = input.required<{key: string, value: string}[]>();
  defaultOption = input<string>();

  selectEvent = output<string>();

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.leftBtn = this.options()[0];
    this.rightBtn = this.options()[1];

    if (this.defaultOption()) {
      this.selectDefault();
    }
  }

  private selectDefault() {
    this.defaultOption() == this.leftBtn.key ? this.selectLeft() : this.selectRight();
  }

  selectLeft() {
    const toggleBar = this.el.nativeElement.querySelector(".toggle-bar");
    this.renderer.setStyle(toggleBar, 'left', '0');

    this.selectEvent.emit(this.leftBtn.key);
  }

  selectRight() {
    const toggleBar = this.el.nativeElement.querySelector(".toggle-bar");
    this.renderer.setStyle(toggleBar, 'left', '50%');

    this.selectEvent.emit(this.rightBtn.key);
  }
}
