import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-formulas',
  standalone: true,
  imports: [],
  templateUrl: './formulas.component.html',
  styleUrl: './formulas.component.scss'
})
export class FormulasComponent implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    const tabButtons = this.el.nativeElement.querySelectorAll('.tab-button');

    tabButtons.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', () => {
        // Desactivar todos los botones y paneles
        const allButtons = this.el.nativeElement.querySelectorAll('.tab-button');
        allButtons.forEach((btn: HTMLElement) => this.renderer.removeClass(btn, 'active'));

        const allPanels = this.el.nativeElement.querySelectorAll('.tab-panel');
        allPanels.forEach((panel: HTMLElement) => this.renderer.removeClass(panel, 'active'));

        // Activar el botón y panel seleccionados
        this.renderer.addClass(button, 'active');
        const targetId = button.getAttribute('data-target');
        const targetPanel = this.el.nativeElement.querySelector(`#${targetId}`);
        if (targetPanel) {
          this.renderer.addClass(targetPanel, 'active');
        }
      });
    });
  }
}
