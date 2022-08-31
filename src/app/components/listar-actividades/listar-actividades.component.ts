import { Component, OnInit } from '@angular/core';
import { ActividadesService } from 'src/app/services/actividades.service';

@Component({
  selector: 'app-listar-actividades',
  templateUrl: './listar-actividades.component.html',
  styleUrls: ['./listar-actividades.component.css']
})
export class ListarActividadesComponent implements OnInit {

  listaActividades: String[];

  constructor(
    private actividadesService: ActividadesService
  ) { }

  ngOnInit(): void {
    this.getActividades();
  }

  getActividades = () => {
    this.actividadesService.getActividades().subscribe({
      next: (data: { status: boolean, response: String[] }) => {
        if (data.status) {
          this.listaActividades = data.response;
        }
      }
    });
  }

}
