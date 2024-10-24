import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from '../model/account';
import { SecurityService, openSnackBar } from '../services/security.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RiceCropsService } from '../../public/services/rice-crops.service';
import { FarmerService } from '../../public/services/farmer.service';

@Component({
  selector: 'sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  @Output() isLogin = new EventEmitter<boolean>();
  title = 'Agrotech';
  account: Account = { emailAddress: "", password: "" };
  loginForm?: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private accountService: SecurityService,
		private _snackBar: MatSnackBar,
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
      this.accountService.add(this.account!, this._snackBar).then((request) => {
        if(!request){
          openSnackBar(this._snackBar, "Failed to Log In. Please, try again", "mat-warn");
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
      openSnackBar(this._snackBar, "Incorrect Email", "mat-warn");
    }
    if (this.loginForm!.controls['password'].invalid) {
      openSnackBar(this._snackBar, "Incorrect Password", "mat-warn");
    }
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
