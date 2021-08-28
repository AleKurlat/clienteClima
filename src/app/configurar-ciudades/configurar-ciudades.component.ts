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
  @Input() ciudades?: Array<TipoCiudad>;
  @Output() actualizarCiudades = new EventEmitter<void>();
  formNombre = new FormControl('');

  constructor(private ciudadesService: CiudadesService) { }

  ngOnInit(): void {
    this.traerCiudades()
  }

  borrarCiudad(id: number) {
    this.ciudadesService.borrarCiudad(id)
      .subscribe(() => {
        this.traerCiudades()
        console.log(id + " borrado correctamente")
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
    const reqBody = { "ciudad": ciudad }
    this.ciudadesService.agregarCiudad(reqBody)
      .subscribe(() => {
        this.traerCiudades()
        console.log(ciudad + " agregada correctamente")
      });
  }

  traerCiudades() {
    this.ciudadesService.traerCiudades()
      .subscribe((ciudades: Array<TipoCiudad>) => {
        this.ciudades = ciudades;
      });
  }

}
