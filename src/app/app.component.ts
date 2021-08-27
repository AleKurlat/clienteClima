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

  constructor(private ciudadesService: CiudadesService) { }

  ngOnInit() {
    this.getCiudades();
  }

  getCiudades() {
    this.ciudadesService.getCiudades()
      .subscribe((ciudades: Array<TipoCiudad>) => {
        this.ciudades = ciudades;
      });
  }
}
