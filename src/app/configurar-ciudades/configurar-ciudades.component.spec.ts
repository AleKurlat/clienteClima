import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarCiudadesComponent } from './configurar-ciudades.component';

describe('ConfigurarCiudadesComponent', () => {
  let component: ConfigurarCiudadesComponent;
  let fixture: ComponentFixture<ConfigurarCiudadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurarCiudadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarCiudadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
