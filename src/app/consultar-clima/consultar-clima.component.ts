import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../clima.service';
import { CiudadesService } from '../ciudades.service';
import { FormControl } from '@angular/forms';
import { TipoClima, TipoCiudad, TipoHistorial } from '../tipos';

@Component({
  selector: 'app-consultar-clima',
  templateUrl: './consultar-clima.component.html',
  styleUrls: ['./consultar-clima.component.css']
})
export class ConsultarClimaComponent implements OnInit {

  title = 'consultar-clima';
  checkHistorial = new FormControl(false);
  formCiudad = new FormControl();
  ciudades?: Array<TipoCiudad>;
  clima?: TipoClima;
  historial?: TipoHistorial | null;

  constructor(private climaService: ClimaService, private ciudadesService: CiudadesService) { }

  ngOnInit() {
    this.getCiudades();
  }

  getCiudades() {
    this.ciudadesService.getCiudades()
      .subscribe((ciudades: Array<TipoCiudad>) => {
        this.ciudades = ciudades;
      });
  }

  getClima() {
    const ciudad = this.formCiudad.value;
    const hayHistorial = this.checkHistorial.value
    const cantFilasHistorial = hayHistorial ? 10 : 0; // si la casilla tiene check entonces devuelve 10 registros, sino no devuelve historial 
    const reqBody = { "ciudad": ciudad, "cantFilasHistorial": cantFilasHistorial }
    console.log("esperando respuesta del servidor") // cambiar por preloader

    this.climaService.getClima(reqBody)
      .subscribe((clima: any) => {
        this.clima = hayHistorial ? clima[0].registro : clima; // si se solicitó historial, se muestra en primer lugar la consulta recién realizada
        this.historial = hayHistorial ? clima : null;
      });
  }


}
