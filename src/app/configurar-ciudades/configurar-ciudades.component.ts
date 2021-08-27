import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CiudadesService } from '../ciudades.service';
import { TipoCiudad } from '../tipos';

@Component({
  selector: 'app-configurar-ciudades',
  templateUrl: './configurar-ciudades.component.html',
  styleUrls: ['./configurar-ciudades.component.css']
})
export class ConfigurarCiudadesComponent implements OnInit {
  ciudades?: Array<TipoCiudad>;
  formNombre = new FormControl('');

  constructor(private ciudadesService: CiudadesService) { }

  ngOnInit(): void {
    this.getCiudades();
  }

  getCiudades() {
    this.ciudadesService.getCiudades()
      .subscribe((ciudades: Array<TipoCiudad>) => {
        this.ciudades = ciudades;
      });
  }

  borrarCiudad(id: number) {
    this.ciudadesService.borrarCiudad(id)
      .subscribe(() => {
        console.log(id + " borrado correctamente");
        this.getCiudades()
      });
  }

  agregarCiudad(ciudad: string) {
    const reqBody = { "ciudad": ciudad }
    this.ciudadesService.agregarCiudad(reqBody)
      .subscribe(() => {
        console.log(ciudad + " agregada correctamente");
        this.getCiudades()
      });
  }

}
