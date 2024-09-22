import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { SignInComponent } from './iam/sign-in/sign-in.component';
import { DashboardComponent } from './public/pages/dashboard/dashboard.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DevicesViewComponent } from './devices/pages/devices-view/devices-view.component';
import { ChartsComponent } from './irrigation/data-records/pages/charts-view/charts.component';
import { ConfigurationViewComponent } from './public/pages/settings-view/configuration-view.component';
import {HttpClientModule} from "@angular/common/http";
import { CommonModule } from '@angular/common';
import {SideNavigationBarComponent} from "./public/components/side-navigation-bar/side-navigation-bar.component";
import {HeaderComponent} from "./public/components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    SignInComponent,
    DashboardComponent,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    DevicesViewComponent,
    ChartsComponent,
    ConfigurationViewComponent,
    HttpClientModule, SideNavigationBarComponent, HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  contactForm: FormGroup = new FormGroup({});
  showFiller = false;
  isLogin = false;
  constructor(private formBuilder: FormBuilder
  ) {
    this.createContactForm();
  }
  createContactForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // Aquí puedes agregar la lógica para enviar el formulario
      // por ejemplo, mediante una solicitud HTTP.
    } else {
      console.error('Form invalid');
    }
  }
  onLogin(isLogin: boolean) {
    this.isLogin = isLogin;
  }

  protected readonly localStorage = localStorage;
}
