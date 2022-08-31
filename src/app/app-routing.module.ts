import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Componentes
 */
import { ListarActividadesComponent } from './components/listar-actividades/listar-actividades.component';
import { CrearActividadesComponent } from './components/crear-actividades/crear-actividades.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'listar-actividades', component: ListarActividadesComponent },
  { path: 'crear-actividades', component: CrearActividadesComponent },
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
