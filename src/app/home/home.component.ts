import { Component } from '@angular/core';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { WaveDividerComponent } from './components/wave-divider/wave-divider.component';
import { HeroComponent } from './components/hero/hero.component';
import { FormulasComponent } from './components/formulas/formulas.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, WaveDividerComponent, BenefitsComponent, FormulasComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
