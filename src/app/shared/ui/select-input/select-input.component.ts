import { isPlatformBrowser, NgStyle } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, input, OnDestroy, OnInit, output, PLATFORM_ID, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss',
  host: {
    '[class.invalid]': 'hasErrors()',
    '(click)': "toggleShowDropdown()"
  }
})
/**
 * Componente custom de un input de tipo select
 *
 * @param title Nombre del campo, se mostrará mientras no haya nada seleccionado.
 * @param selected Valor de la opción seleccionada.
 * @param inputSelected Valdrá la key de la opción que se desea seleccionada por defecto.
 * @param options Todas las opciones que se mostrarán en el dropdown:
 *                key   -> El valor que tiene en el Enum.
 *                value -> El texto que se mostrará según la opción seleccionada.
 * @param hasErrors Modifica los estilos si es verdadero.
 * @param selectEvent Emite la key de la opción seleccionada para poder se transformado a Enum en el padre.
 */
export class SelectInputComponent implements OnInit, AfterViewInit, OnDestroy {

  title = input.required<string>();
  selected: string = '';
  inputSelected = input<string | null>();

  showDropdown = false;
  options = input.required<{ key: string, value: string }[]>();

  hasErrors = input<boolean>(false);

  selectEvent = output<string>();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  /**
   * Seleccionamos una de las opciones si el componente recibe 'inputSelected'
   */
  ngOnInit(): void {
    if (this.inputSelected()) {
      const option = this.options().find(opt => opt.key == this.inputSelected())

      if (option) {
        this.selected = option.value;
      }
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.listen('document', 'click', this.handleClickOutside.bind(this));
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.listen('document', 'click', this.handleClickOutside.bind(this))();
    }
  }

  /** Funcion para cerrar el dropdown al hacer click fuera de este */
  handleClickOutside(event: MouseEvent) {
    if (this.showDropdown && !this.el.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  toggleShowDropdown() {
    if (!this.showDropdown)
      this.showDropdown = !this.showDropdown;
    else
      this.closeDropdown()
  }

  closeDropdown() {
    const dropdown = this.el.nativeElement.querySelector('.dropdown');
    this.renderer.removeClass(dropdown, 'deploy-dropdown-animation');
    this.renderer.addClass(dropdown, 'hide-dropdown-animation');

    setTimeout(() => this.showDropdown = false, 200);
  }

  select(option: { key: string, value: string }) {
    this.selected = option.value;
    this.selectEvent.emit(option.key);
    this.closeDropdown();
  }
}
