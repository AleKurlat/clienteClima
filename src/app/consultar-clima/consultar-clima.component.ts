import { Component, OnInit, Input } from '@angular/core';
import { ClimaService } from '../clima.service';
import { CiudadesService } from '../ciudades.service';
import { FormControl } from '@angular/forms';
import { TipoClima, TipoHistorial, TipoCiudades, RespuestaApi, RespuestaApiMapeada } from '../tipos';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-consultar-clima',
  templateUrl: './consultar-clima.component.html',
  styleUrls: ['./consultar-clima.component.css']
})
export class ConsultarClimaComponent implements OnInit {

  title = 'consultar-clima';
  checkHistorial = new FormControl(false);
  formCiudad = new FormControl();
  formCantFilas = new FormControl(10);
  ciudades?: TipoCiudades | null;
  clima?: TipoClima;
  historial?: TipoHistorial | null;
  isLoading = false;

  constructor(private climaService: ClimaService, private ciudadesService: CiudadesService) { }

  ngOnInit(): void {
    this.traerCiudades();
  }

  traerCiudades() {
    this.isLoading = true;
    this.ciudadesService.traerCiudades()
      .subscribe(
        (ciudades: TipoCiudades) => {
          this.ciudades = ciudades; // si petición sale ok, asigna resultado a propiedad "ciudades"
        },
        () => this.ciudades = null //callback en caso de error, indica que falló carga de ciudades para que el template sepa que tiene que mostrar ese mensaje
      )
      .add(() => {
        this.isLoading = false; //callback de finalizacion, independientemente de como haya salido la petición
      });
  }

  getClima(ciudad: string, hayHistorial: boolean, cantFilas: number) {
    if (!ciudad) {
      Swal.fire("Debe seleccionar una ciudad")
      return
    }
    if (cantFilas < 1) {
      cantFilas = 10
      this.formCantFilas.setValue(10);
    }
    // construyo un objeto que voy a utilizar para la petición a la API
    const reqBody = {
      "ciudad": ciudad,
      "cantFilasHistorial": hayHistorial ? cantFilas : 0 // si la casilla tiene check entonces devuelve la cantidad de registros que marca el input, sino no devuelve historial 
    }
    this.isLoading = true;

    this.climaService.getClima(reqBody).subscribe(
      (respuestaApi: any) => {
        this.clima = respuestaApi.actual; // si petición sale ok, asigna resultado a propiedad "clima"
        this.historial = respuestaApi.registros; // si no se solicitó historial, volverá nulo
      }
    ).add(() => {
      this.isLoading = false; //callback de finalizacion, independientemente de como haya salido la petición
    });;
  }
}
