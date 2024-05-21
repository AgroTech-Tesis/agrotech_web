import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'principal-view',
  standalone: true,
  imports: [
    NgIf,
    MatIconModule
  ],
  templateUrl: './principal-view.component.html',
  styleUrl: './principal-view.component.css'
})
export class PrincipalViewComponent {
  WeatherData:any;
  constructor() { }

  ngOnInit() {
    this.WeatherData = {
      main : {},
      isDay: true
    };
    this.getWeatherData();
    console.log(this.WeatherData);
  }

  getWeatherData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=tumbes&appid=2f9e9bd1c34f8074792547f6b3bf82bb')
      .then(response=>response.json())
      .then(data=>{this.setWeatherData(data);})

    // let data = JSON.parse('{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}');
    // this.setWeatherData(data);
  }

  setWeatherData(data: any){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
    let description = this.WeatherData.weather[0].description;
    switch (description) {
      case 'clear sky':
        this.WeatherData.description = 'cielo despejado';
        break;
      case 'few clouds':
        this.WeatherData.description = 'parcialmente nublado';
        break;
      case 'scattered clouds':
        this.WeatherData.description = 'nubes dispersas';
        break;
      case 'broken clouds':
        this.WeatherData.description = 'nubes rotas';
        break;
      case 'shower rain':
        this.WeatherData.description = 'lluvia de chubascos';
        break;
      case 'rain':
        this.WeatherData.description = 'lluvioso';
        break;
      case 'thunderstorm':
        this.WeatherData.description = 'tormenta eléctrica';
        break;
      case 'snow':
        this.WeatherData.description = 'nieve';
        break;
      case 'mist':
        this.WeatherData.description = 'niebla';
        break;
      default:
        this.WeatherData.description = description; // En caso de que haya una descripción no contemplada, la dejamos tal cual.
        break;
    }
  }
}
