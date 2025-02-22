import { Component, effect, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaComponent } from '../../../shared/ui/textarea/textarea.component';
import { Measurement, MeasurementRequest } from '../../../shared/models/measurement';
import { MeasurementService } from '../../../shared/services/measurement.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { MessageService } from '../../../message-modal/message.service';

@Component({
  selector: 'app-measurement-form',
  standalone: true,
  imports: [TextareaComponent, ReactiveFormsModule, MatProgressSpinner],
  templateUrl: './measurement-form.component.html',
  styleUrl: './measurement-form.component.scss'
})
export class MeasurementFormComponent {
  measurement = input<Measurement | null>();
  newSessionNumber = input<number>();
  customerId = input.required<number>();

  loading: boolean = false; // Este atributo se encargará de mostrar y ocultar el spinner de carga
  measurementChangeEvent = output<Measurement>(); // Este output se encargará de enviar al padre las mediciones nuevas y las editadas

  constructor(
    private fb: FormBuilder,
    private measurementService: MeasurementService,
    private messageService: MessageService
  ) {
    // Modificamos los valores del formulario cada vez que se cambie la pestaña
    effect(() => this.patchMeasurementValues())
  }

  submit() {
    /* if (!this.measurementForm.valid) {
      this.measurementForm.markAllAsTouched();
      return;
    } */

    this.loading = true;
    const observable = this.measurement() ? this.edit() : this.create()

    observable
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (measurement) => {
          measurement.session = this.measurement() ? this.measurement()!.session : this.newSessionNumber()!;
          this.measurementChangeEvent.emit(measurement);
          this.messageService.emitSuccess(`Medición ${this.measurement() ? "editada" : "creada"} correctamente`);
        },
        error: (error) => {
          console.error("MEASUREMENT-FORM: ", error);
          this.messageService.emitError(`No se ha podido ${this.measurement() ? "editar" : "crear"} la medición`);
        }
      });
  }

  create() {
    return this.measurementService.addMeasurement(this.formToMeasurement())
  }

  edit() {
    return this.measurementService.updateMeasurement(this.formToMeasurement())
  }

  /**
   * Patchea los valores de los input por los valores del Measurement recibido por input
   */
  patchMeasurementValues() {
    const date = new Date();
    const formatted = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    this.measurementForm.patchValue({
      date: this.measurement()?.date.toString() || formatted,
      weight: this.measurement()?.weight,
      circumference: ({
        id: this.measurement()?.circumference?.id,
        neck: this.measurement()?.circumference?.neck,
        chest: this.measurement()?.circumference?.chest,
        armRelaxed: this.measurement()?.circumference?.armRelaxed,
        armFlexed: this.measurement()?.circumference?.armFlexed,
        waist: this.measurement()?.circumference?.waist,
        hip: this.measurement()?.circumference?.hip,
        thigh: this.measurement()?.circumference?.thigh,
        calf: this.measurement()?.circumference?.calf,
      }),
      skinfold: ({
        id: this.measurement()?.skinfold?.id,
        triceps: this.measurement()?.skinfold?.triceps,
        biceps: this.measurement()?.skinfold?.biceps,
        subscapular: this.measurement()?.skinfold?.subscapular,
        suprailiac: this.measurement()?.skinfold?.suprailiac,
        iliacCrest: this.measurement()?.skinfold?.iliacCrest,
        abdominal: this.measurement()?.skinfold?.abdominal,
        thigh: this.measurement()?.skinfold?.thigh,
        calf: this.measurement()?.skinfold?.calf,
      }),
      diameter: ({
        id: this.measurement()?.diameter?.id,
        biacromial: this.measurement()?.diameter?.biacromial,
        biIliacCrest: this.measurement()?.diameter?.biIliacCrest,
        humeralBicondylar: this.measurement()?.diameter?.humeralBicondylar,
        femoralBicondylar: this.measurement()?.diameter?.femoralBicondylar,
        bistyloid: this.measurement()?.diameter?.bistyloid,
        bimalleolar: this.measurement()?.diameter?.bimalleolar,
        transverseThoracic: this.measurement()?.diameter?.transverseThoracic,
        anteroposteriorThoracic: this.measurement()?.diameter?.anteroposteriorThoracic,
      }),
      observations: this.measurement()?.observations,
    })

  }

  /** Inicializa el formulario vacio y sus Validadores */
  measurementForm = this.fb.group({
    date: ['', Validators.required],
    weight: [0, [Validators.required, Validators.min(0)]],
    circumference: this.fb.group({
      id: [0], // Aunque marque el id como 0, al cargar los datos de un Measurement vacio, este será undefined
      neck: [0, [Validators.min(0)]],
      chest: [0, [Validators.min(0)]],
      armRelaxed: [0, [Validators.min(0)]],
      armFlexed: [0, [Validators.min(0)]],
      waist: [0, [Validators.min(0)]],
      hip: [0, [Validators.min(0)]],
      thigh: [0, [Validators.min(0)]],
      calf: [0, [Validators.min(0)]],
    }),
    skinfold: this.fb.group({
      id: [0], // Aunque marque el id como 0, al cargar los datos de un Measurement vacio, este será undefined
      triceps: [0, [Validators.min(0)]],
      biceps: [0, [Validators.min(0)]],
      subscapular: [0, [Validators.min(0)]],
      suprailiac: [0, [Validators.min(0)]],
      iliacCrest: [0, [Validators.min(0)]],
      abdominal: [0, [Validators.min(0)]],
      thigh: [0, [Validators.min(0)]],
      calf: [0, [Validators.min(0)]],
    }),
    diameter: this.fb.group({
      id: [0], // Aunque marque el id como 0, al cargar los datos de un Measurement vacio, este será undefined
      biacromial: [0, [Validators.min(0)]],
      biIliacCrest: [0, [Validators.min(0)]],
      humeralBicondylar: [0, [Validators.min(0)]],
      femoralBicondylar: [0, [Validators.min(0)]],
      bistyloid: [0, [Validators.min(0)]],
      bimalleolar: [0, [Validators.min(0)]],
      transverseThoracic: [0, [Validators.min(0)]],
      anteroposteriorThoracic: [0, [Validators.min(0)]],
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
  get diameterControls() {
    return this.controls.diameter.controls;
  }

  private formToMeasurement(): MeasurementRequest {
    let id = null;
    let session = this.newSessionNumber()!;

    if (this.measurement()) {
      id = this.measurement()!.id;
      session = this.measurement()!.session;
    }

    const circumference = Object.values(this.circumferenceControls).some(control => control.value) ? {
      id: this.circumferenceControls.id.value ?? null,
      neck: this.circumferenceControls.neck.value!,
      chest: this.circumferenceControls.chest.value!,
      armRelaxed: this.circumferenceControls.armRelaxed.value!,
      armFlexed: this.circumferenceControls.armFlexed.value!,
      waist: this.circumferenceControls.waist.value!,
      hip: this.circumferenceControls.hip.value!,
      thigh: this.circumferenceControls.thigh.value!,
      calf: this.circumferenceControls.calf.value!,
    } : null;

    const skinfold = Object.values(this.skinfoldControls).some(control => control.value) ? {
      id: this.skinfoldControls.id.value ?? null,
      triceps: this.skinfoldControls.triceps.value!,
      biceps: this.skinfoldControls.biceps.value!,
      subscapular: this.skinfoldControls.subscapular.value!,
      suprailiac: this.skinfoldControls.suprailiac.value!,
      iliacCrest: this.skinfoldControls.iliacCrest.value!,
      abdominal: this.skinfoldControls.abdominal.value!,
      thigh: this.skinfoldControls.thigh.value!,
      calf: this.skinfoldControls.calf.value!,
    } : null;

    const diameter = Object.values(this.diameterControls).some(control => control.value) ? {
      id: this.diameterControls.id.value ?? null,
      biacromial: this.diameterControls.biacromial.value!,
      biIliacCrest: this.diameterControls.biIliacCrest.value!,
      humeralBicondylar: this.diameterControls.humeralBicondylar.value!,
      femoralBicondylar: this.diameterControls.femoralBicondylar.value!,
      bistyloid: this.diameterControls.bistyloid.value!,
      bimalleolar: this.diameterControls.bimalleolar.value!,
      transverseThoracic: this.diameterControls.transverseThoracic.value!,
      anteroposteriorThoracic: this.diameterControls.anteroposteriorThoracic.value!,
    } : null;

    return {
      id: id,
      customer: { id: this.customerId() },
      session: session,
      date: new Date(this.controls.date.value!),
      weight: this.controls.weight.value!,
      circumference: circumference,
      skinfold: skinfold,
      diameter: diameter,
      observations: this.controls.observations.value!,
    };
  }

}
