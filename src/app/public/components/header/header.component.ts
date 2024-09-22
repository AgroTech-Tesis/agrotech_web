import {MatIcon} from "@angular/material/icon";
import {Component, EventEmitter, Output, Pipe, PipeTransform} from "@angular/core";
import {DatePipe, formatDate, NgOptimizedImage} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'header-bar',
  standalone: true,
  imports: [
    MatIcon,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() isLoginChange: EventEmitter<boolean> = new EventEmitter();
  time: any;
  hours: any;
  msg: any;
  date: any;
  now: any;
  constructor(
    private router: Router
  ){
    setInterval(() => {
      this.now = new Date();
      this.time = formatDate(this.now, 'hh:mm:ss a', 'en-US');
      this.date = formatDate(this.now, 'EEEE, d MMMM yyyy', 'en-US');
    }, 1000);

    this.decide();

  }

  decide() {
    this.hours = new Date().getHours();
    console.log("this.hours",this.hours)
    if(this.hours < 10){
      this.msg = "Good Morning"
    }else if(this.hours < 16){
      this.msg = "Good Afternoon"
    }else if(this.hours < 19){
      this.msg = "Good Evening"
    }else if(this.hours < 24){
      this.msg = "Good Night"
    }else if(this.hours < 6){
      this.msg = "Sleep lah"
    }
  }
  logout() {
    // Elimina el usuario del localStorage
    localStorage.removeItem('user');
    this.isLoginChange.emit(false);
    // Redirige al usuario al formulario de login
    this.navigateTo('/sign-in');

    // Opcional: Cambiar el estado de login si es necesario
    // this.isLogin = false; (si manejas una variable para el login)
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  protected readonly localStorage = localStorage;
  protected readonly JSON = JSON;
}
