import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-formulas',
  standalone: true,
  imports: [],
  templateUrl: './formulas.component.html',
  styleUrl: './formulas.component.scss'
})
export class FormulasComponent implements AfterViewInit {

  // Índice de la pestaña actual para determinar la dirección
  private currentTabIndex = 0

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngAfterViewInit(): void {
    const tabButtons = this.el.nativeElement.querySelectorAll(".tab-button")

    // Asignar índices a los botones de pestañas para seguimiento
    tabButtons.forEach((button: HTMLElement, index: number) => {
      button.setAttribute("data-index", index.toString())

      this.renderer.listen(button, "click", () => {
        // Obtener el índice de la pestaña seleccionada
        const newIndex = Number.parseInt(button.getAttribute("data-index") || "0")

        // Determinar la dirección de la animación
        const direction = newIndex > this.currentTabIndex ? "right" : "left"

        // Desactivar todos los botones
        const allButtons = this.el.nativeElement.querySelectorAll(".tab-button")
        allButtons.forEach((btn: HTMLElement) => this.renderer.removeClass(btn, "active"))

        // Activar el botón seleccionado
        this.renderer.addClass(button, "active")

        // Obtener el panel actual y el panel objetivo
        const targetId = button.getAttribute("data-target")
        const currentPanel = this.el.nativeElement.querySelector(".tab-panel.active")
        const targetPanel = this.el.nativeElement.querySelector(`#${targetId}`)

        if (currentPanel && targetPanel) {
          // Preparar la animación
          this.animateTabTransition(currentPanel, targetPanel, direction)
        }

        // Actualizar el índice actual
        this.currentTabIndex = newIndex
      })
    })
  }

  /**
   * Anima la transicion de salida y de entrada de los elementos recibidos por parametro segun la direccion especificada
   *
   * @param currentPanel El conjunto de formulas que se estan mostrando en el momento.
   * @param targetPanel El conjunto de formulas que el usuario quiere mostrar.
   * @param direction la direccion en la que se moverán los elementos.
   */
  private animateTabTransition(currentPanel: HTMLElement, targetPanel: HTMLElement, direction: string): void {
    // Configurar posiciones iniciales
    const startPosition = direction === "right" ? "translate3d(100%, 0, 0)" : "translate3d(-100%, 0, 0)"
    const exitPosition = direction === "right" ? "translate3d(-100%, 0, 0)" : "translate3d(100%, 0, 0)"

    // Preparar el panel entrante
    this.renderer.setStyle(targetPanel, "display", "block")
    this.renderer.setStyle(targetPanel, "transform", startPosition)
    this.renderer.setStyle(targetPanel, "transition", "none")

    // Forzar reflow para asegurar que los estilos se apliquen antes de la animación
    targetPanel.offsetHeight

    // Configurar animaciones
    this.renderer.setStyle(currentPanel, "transition", "transform 0.4s ease-in-out")
    this.renderer.setStyle(targetPanel, "transition", "transform 0.4s ease-in-out")

    // Iniciar animaciones
    this.renderer.setStyle(currentPanel, "transform", exitPosition)
    this.renderer.setStyle(targetPanel, "transform", "translate3d(0, 0, 0)")

    // Limpiar después de la animación
    setTimeout(() => {
      // Quitar la clase active del panel actual
      this.renderer.removeClass(currentPanel, "active")
      // Añadir la clase active al panel objetivo
      this.renderer.addClass(targetPanel, "active")

      // Restablecer estilos
      this.renderer.removeStyle(currentPanel, "transform")
      this.renderer.removeStyle(currentPanel, "transition")
      this.renderer.removeStyle(targetPanel, "transform")
      this.renderer.removeStyle(targetPanel, "transition")

      // Ocultar el panel anterior
      if (currentPanel !== targetPanel) {
        this.renderer.setStyle(currentPanel, "display", "none")
      }
    }, 400) // Debe coincidir con la duración de la transición
  }
}
