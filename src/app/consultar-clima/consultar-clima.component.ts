import { Component, OnInit, Input } from '@angular/core';
import { ClimaService } from '../clima.service';
import { CiudadesService } from '../ciudades.service';
import { FormControl } from '@angular/forms';
import { TipoClima, TipoHistorial, TipoCiudades } from '../tipos';
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
  cantFilas = new FormControl(10);
  ciudades?: TipoCiudades;
  clima?: TipoClima;
  historial?: TipoHistorial;
  isLoading = false;

  constructor(private climaService: ClimaService, private ciudadesService: CiudadesService) { }

  ngOnInit(): void {
    this.traerCiudades();
  }

  traerCiudades() {
    this.isLoading = true;
    this.ciudadesService.traerCiudades()
      .subscribe((ciudades: TipoCiudades) => {
        this.ciudades = ciudades;
        this.isLoading = false;
      });
  }

  getClima(ciudad: string, hayHistorial: boolean, cantFilas: number) {
    if (!ciudad) {
      Swal.fire("Debe seleccionar una ciudad")
      return
    }
    if (cantFilas < 1) {
      Swal.fire("La cantidad de registros consultados no puede ser menor a 1")
      return
    }
    const reqBody = {
      "ciudad": ciudad,
      "cantFilasHistorial": hayHistorial ? cantFilas : 0 // si la casilla tiene check entonces devuelve la cantidad de registros que marca el input, sino no devuelve historial 
    }
    this.isLoading = true;
    this.climaService.getClima(reqBody)
      .subscribe((clima: TipoHistorial) => {
        // si se solicitó historial, se muestra en primer lugar la consulta recién realizada
        if (hayHistorial) {
          this.clima = clima[0].registro;
          this.historial = clima;
        } else {
          this.clima = clima;
        }
        this.isLoading = false;
      });
  }
}
