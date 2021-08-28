import { Component, OnInit, Input } from '@angular/core';
import { ClimaService } from '../clima.service';
import { CiudadesService } from '../ciudades.service';
import { FormControl } from '@angular/forms';
import { TipoClima, TipoCiudad, TipoHistorial } from '../tipos';
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
  ciudades?: Array<TipoCiudad>;
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
      .subscribe((ciudades: Array<TipoCiudad>) => {
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
      .subscribe((clima: any) => {
        this.clima = hayHistorial ? clima[0].registro : clima; // si se solicitó historial, se muestra en primer lugar la consulta recién realizada
        this.historial = hayHistorial ? clima : null;
        this.isLoading = false;
      });
  }
}
