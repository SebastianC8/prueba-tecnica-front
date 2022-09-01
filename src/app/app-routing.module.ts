import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TokenGuard } from './guards/token.guard';

/**
 * Componentes
 */
import { ListarActividadesComponent } from './components/listar-actividades/listar-actividades.component';
import { CrearActividadesComponent } from './components/crear-actividades/crear-actividades.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'listar-actividades', component: ListarActividadesComponent, canActivate: [TokenGuard] },
  { path: 'crear-actividades', component: CrearActividadesComponent, canActivate: [TokenGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
