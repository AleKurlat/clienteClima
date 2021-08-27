import { Component } from '@angular/core';
import { CiudadesService } from './ciudades.service';
import { TipoCiudad } from './tipos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'consultar-clima';
  ciudades?: Array<TipoCiudad>;
  panelConfigurar = false;

  constructor(private ciudadesService: CiudadesService) { }

  ngOnInit() {
    this.traerCiudades();
  }

  toggleConfigurar() {
    this.panelConfigurar = !this.panelConfigurar
  }

  traerCiudades() {
    this.ciudadesService.traerCiudades()
      .subscribe((ciudades: Array<TipoCiudad>) => {
        this.ciudades = ciudades;
      });
  }
}
