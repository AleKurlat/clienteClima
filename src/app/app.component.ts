import { Component } from '@angular/core';
import { ClimaService } from './clima.service';
import { FormControl } from '@angular/forms';
import { TipoClima } from './tipoClima'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'consultar-clima';
  formNombre = new FormControl('');
  checkHistorial = new FormControl(false);
  formCiudad = new FormControl();
  ciudades = ["Buenos Aires", "Londres"]

  clima?: TipoClima;
  historial?: any; // despues ver

  constructor(private climaService: ClimaService) { }

  getClima() {
    const ciudad = this.formCiudad.value;
    console.log(ciudad)
    const hayHistorial = this.checkHistorial.value
    const cantFilasHistorial = hayHistorial ? 10 : 0; // si la casilla tiene check entonces devuelve 10 registros, sino no devuelve historial 
    const reqBody = { "ciudad": ciudad, "cantFilasHistorial": cantFilasHistorial }
    console.log(reqBody);
    console.log("esperando respuesta del servidor") // cambiar por preloader

    this.climaService.getClima(reqBody)
      .subscribe((clima: TipoClima) => {
        this.clima = hayHistorial ? clima[0].registro : clima; // si se solicitó historial, se muestra en primer lugar la consulta recién realizada
        this.historial = hayHistorial ? clima : null;
      });
  }

}
