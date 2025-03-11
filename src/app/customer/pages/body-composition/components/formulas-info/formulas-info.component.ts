import { Component } from '@angular/core';
import { FORMULAS } from '../../../../../shared/models/constants/formulas.constants';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-formulas-info',
  standalone: true,
  imports: [NgClass],
  templateUrl: './formulas-info.component.html',
  styleUrl: './formulas-info.component.scss'
})
export class FormulasInfoComponent {
  FORMULAS = FORMULAS;
  tabSelected = FORMULAS.DURNIN_WOMERSLEY;

  selectTab(value: string) {
    this.tabSelected = value;
  }
}
