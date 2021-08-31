import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarClimaComponent } from './consultar-clima/consultar-clima.component';
import { ConfigurarCiudadesComponent } from './configurar-ciudades/configurar-ciudades.component';
import { PaginaNoEncontradaComponent } from "./pagina-no-encontrada/pagina-no-encontrada.component"

const routes: Routes = [
  { path: 'configurar-ciudades', component: ConfigurarCiudadesComponent },
  { path: 'consultar-clima', component: ConsultarClimaComponent },
  { path: '', redirectTo: '/consultar-clima', pathMatch: 'full' },
  { path: '**', component: PaginaNoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
