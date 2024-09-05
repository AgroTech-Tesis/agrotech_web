import { Injectable } from '@angular/core';
import { WeatherForecast } from '../model/weather-forecast';
import {kelvinToCelsius} from "../../shared/utils/kelvin-to-celcius";
import {API_KEY} from "../../../../environments/enviroment.conts";

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastsService {

  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = API_KEY;

  constructor() {}

  async getWeatherData(city: string): Promise<WeatherForecast> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return this.transformWeatherData(data);
  }

  private transformWeatherData(data: any): WeatherForecast {
    return {
      name: data.name,
      temp_celsius: kelvinToCelsius(data.main.temp),
      temp_min: kelvinToCelsius(data.main.temp_min),
      temp_max: kelvinToCelsius(data.main.temp_max),
      description: data.weather[0].description,
    };
  }
}
