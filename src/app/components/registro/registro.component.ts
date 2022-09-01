import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formRegistro: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm = () => {
    this.formRegistro = this.formBuilder.group({
      identificacion: ['', Validators.required],
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required]
    });
  }

  registro = () => {
    if (this.formRegistro.valid) {
      const formData = new FormData();
      formData.append('identificacion', this.formRegistro.get('identificacion').value);
      formData.append('usuario', this.formRegistro.get('usuario').value);
      formData.append('contraseña', this.formRegistro.get('contraseña').value);

      this.loginService.registro(formData).subscribe({
        next: (data: { status: boolean, response: String[] }) => {
          if (data.status) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: data.response,
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/login']);
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: data.response,
              showConfirmButton: false,
              timer: 1500
            });
          }
        }
      })
    }
  }

}
