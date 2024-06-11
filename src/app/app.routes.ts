import { RouterModule, Routes } from '@angular/router';
import { PrincipalViewComponent } from './IrrigationManagement/pages/control-panel-view/principal-view.component';
import { DevicesViewComponent } from './IrrigationManagement/pages/devices-view/devices-view.component';
import { SignInComponent } from './IdentityAndAccessManagement/sign-in/sign-in.component';
import { PlostViewComponent } from './IrrigationManagement/pages/charts-view/plost-view.component';
import { NgModule } from '@angular/core';
import {ConfigurationViewComponent} from "./IrrigationManagement/pages/settings-view/configuration-view.component";

export const routes: Routes = [
  { path: 'control-panel', component: PrincipalViewComponent },
  { path: 'devices', component: DevicesViewComponent },
  { path: 'historical-data', component: PlostViewComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'settings', component: ConfigurationViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
