import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyCompositionComponent } from './body-composition.component';

describe('BodyCompositionComponent', () => {
  let component: BodyCompositionComponent;
  let fixture: ComponentFixture<BodyCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyCompositionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
