import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarClimaComponent } from './consultar-clima/consultar-clima.component';
import { ConfigurarCiudadesComponent } from './configurar-ciudades/configurar-ciudades.component';

const routes: Routes = [
  { path: 'configurar-ciudades', component: ConfigurarCiudadesComponent },
  { path: 'consultar-clima', component: ConsultarClimaComponent },
  { path: '', redirectTo: '/consultar-clima', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
