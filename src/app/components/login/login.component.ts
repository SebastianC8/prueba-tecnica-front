import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuiler: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm = () => {
    this.formLogin = this.formBuiler.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login = () => {

    const formData = new FormData();
    formData.append('username', this.formLogin.get('username').value);
    formData.append('password', this.formLogin.get('password').value);

    this.loginService.login(formData).subscribe({
      next: (data: { status: boolean, response: String[] }) => {
        if (data.status) {
          /** Redirige a la aplicación */
          this.saveLocalStorage(data.response);
          this.router.navigate(['/listar-actividades']);
        } else {
          /** Credenciales incorrectas */
          Swal.fire({  
            position: 'center',
            icon: 'error',
            title: data.response,
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    });
  }

  saveLocalStorage = (user: any) => localStorage.setItem('userId', user.id);

}
