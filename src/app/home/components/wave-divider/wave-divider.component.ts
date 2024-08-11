import { Component, ElementRef, inject, input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-wave-divider',
  standalone: true,
  imports: [],
  templateUrl: './wave-divider.component.html',
  styleUrl: './wave-divider.component.scss'
})
export class WaveDividerComponent implements OnInit {
  rotate = input<boolean>(false);

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    if (this.rotate()) {
      this.renderer.addClass(this.el.nativeElement.querySelector('.waves'), 'rotate-waves')
    }
  }
}
