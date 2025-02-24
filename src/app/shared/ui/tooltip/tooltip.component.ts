import { Component, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {
  @Input() text = '';

  private tooltipElement: HTMLElement | null = null;
  private childElement!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    // Obtiene el primer hijo directo del componente (app-imc en este caso)
    this.childElement = this.el.nativeElement.firstElementChild;
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltipElement) {
      this.tooltipElement = this.renderer.createElement('span');
      this.tooltipElement!.innerText = this.text;
      this.renderer.addClass(this.tooltipElement, 'tooltip');
      this.renderer.appendChild(document.body, this.tooltipElement);

      const rect = this.childElement.getBoundingClientRect();

      console.log(rect)

      this.renderer.setStyle(this.tooltipElement, 'top', `${rect.top - 35}px`);
      this.renderer.setStyle(this.tooltipElement, 'left', `${rect.left + rect.width / 2}px`);
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
