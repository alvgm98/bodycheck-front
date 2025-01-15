import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaComponent } from '../../../shared/ui/textarea/textarea.component';

@Component({
  selector: 'app-measurement-form',
  standalone: true,
  imports: [TextareaComponent ,ReactiveFormsModule],
  templateUrl: './measurement-form.component.html',
  styleUrl: './measurement-form.component.scss'
})
export class MeasurementFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  submit() {

  }

  /** Inicializa el formulario vacio y sus Validadores */
  measurementForm = this.fb.group({
    date: [new Date(), Validators.required],
    weight: [null, [Validators.required, Validators.min(0)]],
    circumference: this.fb.group({
      id: [null],
      neck: [null, [Validators.required, Validators.min(0)]],
      chest: [null, [Validators.required, Validators.min(0)]],
      armRelaxed: [null, [Validators.required, Validators.min(0)]],
      armFlexed: [null, [Validators.required, Validators.min(0)]],
      waist: [null, [Validators.required, Validators.min(0)]],
      hip: [null, [Validators.required, Validators.min(0)]],
      thigh: [null, [Validators.required, Validators.min(0)]],
      calf: [null, [Validators.required, Validators.min(0)]],
    }),
    skinfold: this.fb.group({
      id: [null],
      triceps: [null, [Validators.required, Validators.min(0)]],
      biceps: [null, [Validators.required, Validators.min(0)]],
      subscapular: [null, [Validators.required, Validators.min(0)]],
      suprailiac: [null, [Validators.required, Validators.min(0)]],
      iliacCrest: [null, [Validators.required, Validators.min(0)]],
      abdominal: [null, [Validators.required, Validators.min(0)]],
      thigh: [null, [Validators.required, Validators.min(0)]],
      calf: [null, [Validators.required, Validators.min(0)]],
    }),
    observations: [''],
  });
  get controls() {
    return this.measurementForm.controls;
  }
  get circumferenceControls() {
    return this.controls.circumference.controls;
  }
  get skinfoldControls() {
    return this.controls.skinfold.controls;
  }
}
