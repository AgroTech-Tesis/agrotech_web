import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {MatIconModule} from '@angular/material/icon';
import {WeatherForecastService} from "../services/weather-forecast.service";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'principal-view',
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './principal-view.component.html',
  styleUrl: './principal-view.component.css'
})
export class PrincipalViewComponent {
  WeatherData: any;
  constructor(private weatherForecastService: WeatherForecastService) {
  }

  ngOnInit() {
    this.weatherForecastService.getWeatherData()
      .then(data => {
        this.WeatherData = data;
        console.log('result', this.WeatherData);
      })
      .catch(error => {
        console.error('Error fetching weather data', error);
      });
  }

}
