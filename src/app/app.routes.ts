import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './public/pages/dashboard/dashboard.component';
import { DevicesViewComponent } from './devices/pages/devices-view/devices-view.component';
import { SignInComponent } from './iam/sign-in/sign-in.component';
import { ChartsComponent } from './irrigation/data-records/pages/charts-view/charts.component';
import { NgModule } from '@angular/core';
import {ConfigurationViewComponent} from "./public/pages/settings-view/configuration-view.component";

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'devices', component: DevicesViewComponent },
  { path: 'historical-data', component: ChartsComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'settings', component: ConfigurationViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
