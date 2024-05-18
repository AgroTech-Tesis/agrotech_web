import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from './IdentityAndAccessManagement/sign-in/sign-in.component';
import { PrincipalViewComponent } from './IrrigationManagement/principal-view/principal-view.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DevicesViewComponent } from './IrrigationManagement/devices-view/devices-view.component';
import { PlostViewComponent } from './IrrigationManagement/plost-view/plost-view.component';
import { ConfigurationViewComponent } from './IrrigationManagement/configuration-view/configuration-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterOutlet,
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
    ConfigurationViewComponent],
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
