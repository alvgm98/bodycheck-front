import { NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, input, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [NgStyle, NgClass],
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
export class SelectInputComponent implements OnInit {

  title = input.required<string>();
  selected: string = '';
  inputSelected = input<string | null>();

  showDropdown = false;
  options = input.required<{ key: string, value: string }[]>();

  hasErrors = input<boolean>(false);

  selectEvent = output<string>();

  constructor(private el: ElementRef) { }

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

  toggleShowDropdown() {
    if (!this.showDropdown)
      this.showDropdown = !this.showDropdown;
    else
      this.closeDropdown()
  }

  closeDropdown() {
    const dropdown = this.el.nativeElement.querySelector('.dropdown');
    dropdown.classList.remove('deploy-dropdown-animation')
    dropdown.classList.add('hide-dropdown-animation')

    setTimeout(() => this.showDropdown = false, 200);
  }

  select(option: { key: string, value: string }) {
    this.selected = option.value;
    this.selectEvent.emit(option.key);
    this.closeDropdown();
  }
}
