import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ConfigurarCiudadesComponent } from './configurar-ciudades/configurar-ciudades.component';
import { ConsultarClimaComponent } from './consultar-clima/consultar-clima.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurarCiudadesComponent,
    ConsultarClimaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
