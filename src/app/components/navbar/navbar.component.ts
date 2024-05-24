import {MatIcon} from "@angular/material/icon";
import {Component, Pipe, PipeTransform} from "@angular/core";
import {DatePipe, formatDate, NgOptimizedImage} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    MatIcon,
    NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
  time: any;
  hours: any;
  msg: any;
  date: any;
  now: any;
  constructor(){
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

}
