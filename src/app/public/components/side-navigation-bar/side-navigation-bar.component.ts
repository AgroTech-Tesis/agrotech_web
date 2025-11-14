import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'side-navigation-bar',
  standalone: true,
  imports: [
    NzIconModule,
    NzMenuModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-navigation-bar.component.html',
  styleUrl: './side-navigation-bar.component.css'
})
export class SideNavigationBarComponent {

}
