import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CiudadesService } from '../ciudades.service';
import { TipoCiudad } from '../tipos';

@Component({
  selector: 'app-configurar-ciudades',
  templateUrl: './configurar-ciudades.component.html',
  styleUrls: ['./configurar-ciudades.component.css']
})
export class ConfigurarCiudadesComponent implements OnInit {
  @Input() ciudades?: Array<TipoCiudad>;
  @Output() actualizarCiudades = new EventEmitter<void>();
  formNombre = new FormControl('');

  constructor(private ciudadesService: CiudadesService) { }

  ngOnInit(): void { }

  borrarCiudad(id: number) {
    this.ciudadesService.borrarCiudad(id)
      .subscribe(() => {
        this.actualizarCiudades.emit();
        console.log(id + " borrado correctamente")
      });
  }

  agregarCiudad(ciudad: string) {
    const reqBody = { "ciudad": ciudad }
    this.ciudadesService.agregarCiudad(reqBody)
      .subscribe(() => {
        this.actualizarCiudades.emit();
        console.log(ciudad + " agregada correctamente")
      });
  }



}
