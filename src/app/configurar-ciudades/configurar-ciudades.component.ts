import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  isLoading = false;

  constructor(private ciudadesService: CiudadesService) { }

  ngOnInit(): void {
    this.traerCiudades()
  }

  borrarCiudad(id: number) {
    this.isLoading = true;
    this.ciudadesService.borrarCiudad(id)
      .subscribe(() => {
        this.traerCiudades()
        console.log(id + " borrado correctamente")
        this.isLoading = false;
      });
  }

  agregarCiudad(ciudad: string) {
    if (!ciudad) {
      alert("Debe seleccionar una ciudad")
      return
    }
    const repetida = this.ciudades?.find((elem) => elem.ciudad === ciudad.toUpperCase())
    if (repetida) {
      alert("Esta ciudad ya fue ingresada previamente")
      return
    }
    this.isLoading = true;
    const reqBody = { "ciudad": ciudad }
    this.ciudadesService.agregarCiudad(reqBody)
      .subscribe(() => {
        this.traerCiudades()
        console.log(ciudad + " agregada correctamente")
        this.isLoading = false;
      });
  }

  traerCiudades() {
    this.isLoading = true;
    this.ciudadesService.traerCiudades()
      .subscribe((ciudades: Array<TipoCiudad>) => {
        this.ciudades = ciudades;
        this.isLoading = false;
      });
  }

}
