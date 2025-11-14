import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../model/account';
import { SecurityService } from '../services/security.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router } from '@angular/router';
import { RiceCropsService } from '../../public/services/rice-crops.service';
import { FarmerService } from '../../public/services/farmer.service';

@Component({
  selector: 'sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzIconModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  @Output() isLogin = new EventEmitter<boolean>();
  title = 'Agrotech';
  account: Account = { emailAddress: "", password: "" };
  loginForm?: FormGroup;
  passwordVisible = false;
  constructor(private formBuilder: FormBuilder,
    private accountService: SecurityService,
		private message: NzMessageService,
    private riceCropsService: RiceCropsService,
    private farmerService: FarmerService,
    private router: Router
  ) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailAddress: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.loginForm!.valid) {
      this.account!.emailAddress = this.loginForm?.get("emailAddress")?.value;
      this.account!.password = this.loginForm?.get("password")?.value;
      this.accountService.add(this.account!, this.message).then((request) => {
        if(!request){
          this.message.error("Failed to Log In. Please, try again");
        }
        this.agregateCredentials(request.id);
      });
    } else {
      this.showValidationErrors();
    }
  }
  agregateCredentials(accountId: number) {
    this.farmerService.getFarmerByAccountId(accountId).subscribe((data: any) => {
      if (data) {
        localStorage.setItem("farmer", JSON.stringify(data.id));
        this.riceCropsService.getRiceCropByFarmerId(data.id).subscribe((response: any) => {
          localStorage.setItem("riceCrops", JSON.stringify(response.id));
        });

        this.isLogin.emit(true);
        localStorage.setItem("user", JSON.stringify(this.account.emailAddress));
        this.navigateTo('/dashboard');
      }
    });
  }
  showValidationErrors() {
    if (this.loginForm!.controls['emailAddress'].invalid) {
      this.message.warning("Incorrect Email");
    }
    if (this.loginForm!.controls['password'].invalid) {
      this.message.warning("Incorrect Password");
    }
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
