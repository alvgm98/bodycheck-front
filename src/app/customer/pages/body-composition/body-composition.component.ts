import { Component } from '@angular/core';
import { BodyCompositionService } from '../../../shared/services/body-composition.service';

@Component({
  selector: 'app-body-composition',
  standalone: true,
  imports: [],
  templateUrl: './body-composition.component.html',
  styleUrl: './body-composition.component.scss'
})
export class BodyCompositionComponent {

  constructor(
    private bodyCompositionService: BodyCompositionService
  ) { }

}
