import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarClimaComponent } from './consultar-clima.component';

describe('ConsultarClimaComponent', () => {
  let component: ConsultarClimaComponent;
  let fixture: ComponentFixture<ConsultarClimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarClimaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarClimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
