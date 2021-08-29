import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CiudadesService } from '../ciudades.service';
import { TipoCiudades } from '../tipos';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-configurar-ciudades',
  templateUrl: './configurar-ciudades.component.html',
  styleUrls: ['./configurar-ciudades.component.css']
})
export class ConfigurarCiudadesComponent implements OnInit {
  ciudades?: TipoCiudades | null;
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
        this.traerCiudades() // vuelvo a traer listado luego de modificar la base de datos
      })
      .add(() => {
        this.isLoading = false; //callback de finalizacion, independientemente de como haya salido la petición
      });
  }

  agregarCiudad(ciudad: string) {
    if (!ciudad) {
      Swal.fire("Debe ingresar una ciudad")
      return
    }
    const repetida = this.ciudades?.find((elem) => elem.ciudad === ciudad.toUpperCase())
    if (repetida) {
      Swal.fire("Esta ciudad ya fue ingresada previamente")
      return
    }
    this.isLoading = true;
    const reqBody = { "ciudad": ciudad }
    this.ciudadesService.agregarCiudad(reqBody)
      .subscribe(() => {
        this.traerCiudades()
      })
      .add(() => {
        this.isLoading = false; //callback de finalizacion, independientemente de como haya salido la petición
      });
  }

  traerCiudades() {
    this.isLoading = true;
    this.ciudadesService.traerCiudades()
      .subscribe((ciudades: TipoCiudades) => {
        this.ciudades = ciudades;
      },
        () => this.ciudades = null //callback en caso de error, indica que falló carga de ciudades para que el template sepa que tiene que mostrar ese mensaje
      )
      .add(() => {
        this.isLoading = false; //callback de finalizacion, independientemente de como haya salido la petición
      });
  }
}
