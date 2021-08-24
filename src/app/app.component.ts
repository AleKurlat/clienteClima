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

  clima?: TipoClima;

  constructor(private climaService: ClimaService) { }

  getClima(cityName: string) {
    const reqBody = { "city": cityName }
    console.log("esperando respuesta del servidor") // cambiar por preloader

    this.climaService.getClima(reqBody)
      .subscribe((clima: TipoClima) => {
        this.clima = clima;
      });
  }

}
