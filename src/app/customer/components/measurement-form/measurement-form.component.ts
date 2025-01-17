import { Component, effect, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaComponent } from '../../../shared/ui/textarea/textarea.component';
import { Measurement } from '../../../shared/models/measurement';

@Component({
  selector: 'app-measurement-form',
  standalone: true,
  imports: [TextareaComponent, ReactiveFormsModule],
  templateUrl: './measurement-form.component.html',
  styleUrl: './measurement-form.component.scss'
})
export class MeasurementFormComponent implements OnInit {

  measurement = input<Measurement | null>();

  constructor(private fb: FormBuilder) {
    // Modificamos los valores del formulario cada vez que se cambie la pestaña
    effect(() => this.patchMeasurementValues())
  }

  ngOnInit(): void {
  }

  submit() {

  }

  /**
   * Patchea los valores de los input por los valores del Measurement recibido por input
   */
  patchMeasurementValues() {
    this.measurementForm.patchValue({
      date: this.measurement()?.date,
      weight: this.measurement()?.weight,
      circumference: ({
        id: this.measurement()?.circumference.id,
        neck: this.measurement()?.circumference.neck,
        chest: this.measurement()?.circumference.chest,
        armRelaxed: this.measurement()?.circumference.armRelaxed,
        armFlexed: this.measurement()?.circumference.armFlexed,
        waist: this.measurement()?.circumference.waist,
        hip: this.measurement()?.circumference.hip,
        thigh: this.measurement()?.circumference.thigh,
        calf: this.measurement()?.circumference.calf,
      }),
      skinfold: ({
        id: this.measurement()?.skinfold.id,
        triceps: this.measurement()?.skinfold.triceps,
        biceps: this.measurement()?.skinfold.biceps,
        subscapular: this.measurement()?.skinfold.subscapular,
        suprailiac: this.measurement()?.skinfold.suprailiac,
        iliacCrest: this.measurement()?.skinfold.iliacCrest,
        abdominal: this.measurement()?.skinfold.abdominal,
        thigh: this.measurement()?.skinfold.thigh,
        calf: this.measurement()?.skinfold.calf,
      }),
      observations: this.measurement()?.observations,
    })
  }

  /** Inicializa el formulario vacio y sus Validadores */
  measurementForm = this.fb.group({
    date: [new Date(), Validators.required],
    weight: [0, [Validators.required, Validators.min(0)]],
    circumference: this.fb.group({
      id: [0],
      neck: [0, [Validators.required, Validators.min(0)]],
      chest: [0, [Validators.required, Validators.min(0)]],
      armRelaxed: [0, [Validators.required, Validators.min(0)]],
      armFlexed: [0, [Validators.required, Validators.min(0)]],
      waist: [0, [Validators.required, Validators.min(0)]],
      hip: [0, [Validators.required, Validators.min(0)]],
      thigh: [0, [Validators.required, Validators.min(0)]],
      calf: [0, [Validators.required, Validators.min(0)]],
    }),
    skinfold: this.fb.group({
      id: [0],
      triceps: [0, [Validators.required, Validators.min(0)]],
      biceps: [0, [Validators.required, Validators.min(0)]],
      subscapular: [0, [Validators.required, Validators.min(0)]],
      suprailiac: [0, [Validators.required, Validators.min(0)]],
      iliacCrest: [0, [Validators.required, Validators.min(0)]],
      abdominal: [0, [Validators.required, Validators.min(0)]],
      thigh: [0, [Validators.required, Validators.min(0)]],
      calf: [0, [Validators.required, Validators.min(0)]],
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
