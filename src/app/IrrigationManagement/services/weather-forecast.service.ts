import { Injectable } from '@angular/core';
import { WeatherForecast } from '../model/WeatherForecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  constructor() {}

  async getWeatherData(): Promise<WeatherForecast> {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=tumbes&appid=2f9e9bd1c34f8074792547f6b3bf82bb');
    const data = await response.json();
    return this.transformWeatherData(data);
  }

  private transformWeatherData(data: any): WeatherForecast {
    return {
      name: data.name,
      temp_celcius: (data.main.temp - 273.15).toFixed(0),
      temp_min: (data.main.temp_min - 273.15).toFixed(0),
      temp_max: (data.main.temp_max - 273.15).toFixed(0),
      // description: this.getDescription(data.weather[0].description)
      description: data.weather[0].description,
    };
  }

  private getDescription(description: string): string {
    switch (description) {
      case 'clear sky':
        return 'cielo despejado';
      case 'few clouds':
        return 'parcialmente nublado';
      case 'scattered clouds':
        return 'nubes dispersas';
      case 'broken clouds':
        return 'nubes rotas';
      case 'shower rain':
        return 'lluvia de chubascos';
      case 'rain':
        return 'lluvioso';
      case 'thunderstorm':
        return 'tormenta eléctrica';
      case 'snow':
        return 'nieve';
      case 'mist':
        return 'niebla';
      default:
        return description;
    }
  }
}
