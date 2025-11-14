import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { SignInComponent } from './iam/sign-in/sign-in.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { CommonModule } from '@angular/common';
import {SideNavigationBarComponent} from "./public/components/side-navigation-bar/side-navigation-bar.component";
import {HeaderComponent} from "./public/components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SignInComponent,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SideNavigationBarComponent,
    HeaderComponent,
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
