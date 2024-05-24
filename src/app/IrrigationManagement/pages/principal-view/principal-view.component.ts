import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {MatIconModule} from '@angular/material/icon';
import {WeatherForecastService} from "../../services/weather-forecast.service";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgxChartsModule, ScaleType} from "@swimlane/ngx-charts";
import {single} from "../../model/BarChartData";

@Component({
  selector: 'principal-view',
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    NgxChartsModule
  ],
  templateUrl: './principal-view.component.html',
  styleUrl: './principal-view.component.css'
})
export class PrincipalViewComponent implements OnInit{
  WeatherData: any;

  constructor(private weatherForecastService: WeatherForecastService) {
    Object.assign(this, { single })
    // Object.assign(this, { single1 });


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

  // BAR CHART

  view: [number, number] = [300, 100];

  // options
  showXAxis = false;
  showYAxis = false;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff', '#0ff', '#0ff', '#0ff'],
  };


  onSelect(event: any) {
    console.log(event);
  }

  protected readonly single = single;


  // PIE CHART

  view1: [number, number] = [300, 100];

  // options
  gradient1: boolean = true;
  showLegend1: boolean = true;
  showLabels1: boolean = true;
  isDoughnut1: boolean = false;
  legendPosition1: string = 'below';

  colorScheme1 = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  onSelect1(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate1(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate1(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
