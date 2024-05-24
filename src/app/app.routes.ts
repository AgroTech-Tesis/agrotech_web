import { RouterModule, Routes } from '@angular/router';
import { PrincipalViewComponent } from './IrrigationManagement/pages/principal-view/principal-view.component';
import { DevicesViewComponent } from './IrrigationManagement/pages/devices-view/devices-view.component';
import { SignInComponent } from './IdentityAndAccessManagement/sign-in/sign-in.component';
import { PlostViewComponent } from './IrrigationManagement/pages/plost-view/plost-view.component';
import { NgModule } from '@angular/core';
import {ConfigurationViewComponent} from "./IrrigationManagement/pages/configuration-view/configuration-view.component";

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: PrincipalViewComponent },
  { path: 'dispositivos', component: DevicesViewComponent },
  { path: 'plantaciones', component: PlostViewComponent },
  { path: 'iniciar-sesion', component: SignInComponent },
  { path: 'configuracion', component: ConfigurationViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
