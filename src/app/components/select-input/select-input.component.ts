import { NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, input, output } from '@angular/core';

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
export class SelectInputComponent {

  selected: string = '';
  selectEvent = output<string>();
  title = input.required<string>();
  options = input.required<{key: string, value: string}[]>();
  hasErrors = input<boolean>(false);

  showDropdown = false;

  constructor(private el: ElementRef) { }

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

  select(option: {key: string, value: string}) {
    this.selected = option.value;
    this.selectEvent.emit(option.key);
    this.closeDropdown();
  }
}
