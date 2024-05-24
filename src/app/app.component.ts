import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { SignInComponent } from './IdentityAndAccessManagement/sign-in/sign-in.component';
import { PrincipalViewComponent } from './IrrigationManagement/pages/principal-view/principal-view.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DevicesViewComponent } from './IrrigationManagement/pages/devices-view/devices-view.component';
import { PlostViewComponent } from './IrrigationManagement/pages/plost-view/plost-view.component';
import { ConfigurationViewComponent } from './IrrigationManagement/pages/configuration-view/configuration-view.component';
import {HttpClientModule} from "@angular/common/http";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    SignInComponent,
    PrincipalViewComponent,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DevicesViewComponent,
    PlostViewComponent,
    ConfigurationViewComponent,
    HttpClientModule, NavbarComponent, SidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  contactForm: FormGroup = new FormGroup({});
  showFiller = false;
  constructor(private formBuilder: FormBuilder) {
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
}
