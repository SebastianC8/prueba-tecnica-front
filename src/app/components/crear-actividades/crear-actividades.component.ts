import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-crear-actividades',
  templateUrl: './crear-actividades.component.html',
  styleUrls: ['./crear-actividades.component.css']
})
export class CrearActividadesComponent implements OnInit {

  formActividades: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private actividadesService: ActividadesService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm = () => {
    this.formActividades = this.formBuilder.group({
      actividad: ['', Validators.required],
      tiempos: this.formBuilder.array([])
    });
  }

  getTiempos = () => this.formActividades.get('tiempos') as FormArray;

  nuevoTiempo = () => {
    return this.formBuilder.group({
      fecha: ['', Validators.required],
      tiempo: ['', Validators.required]
    });
  }

  addTiempo = () => this.getTiempos().push(this.nuevoTiempo());

  eliminarTiempo = (id: number) => this.getTiempos().removeAt(id);

  guardarActividad = () => {

    if (this.formActividades.valid) {

      const acumTiempo = this.getTiempos().value.
        map((time: any) => time.tiempo).
        reduce((a: number, b:number) => a + b, 0);

      if (acumTiempo > 8) {
        return alert('La suma de los tiempos excede la capacidad límite: 8');
      }

      const params = new FormData();
      params.append('actividad', this.formActividades.get('actividad').value);
      params.append('tiempos', JSON.stringify(this.getTiempos().value));

      this.actividadesService.agregarActividad(params).subscribe({
        next: (data: { status: boolean, response: String[] }) => {
          console.log(data);
        }
      });

    }

  }

}
