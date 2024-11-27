import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid'

dotenv.config();
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.API_BASE_URL;
// TODO: Define an interface for the Coordinates object

interface Coordinates {
  id: string;
  city: string;
  stateProv: string;
  country: string;
}

// TODO: Define a class for the Weather object
class Weather {
  id: string;
  city: string;
  date!: string;
  icon!: string;
  iconDescription!: string;
  tempF!: number;
  windSpeed!: number;
  humidity!: number;

  constructor(city: string) {
    this.city = city;
    this.id = uuid();
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  BASE_URL = `${BASE_URL}/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;
  API_KEY = API_KEY;
  cityName: string = ''

  private createCoordinates(city: string, stateProv: string = '', country: string = ''): Coordinates {
    return {
      id: uuid(),
      city,
      stateProv,
      country
    };
  }

  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.BASE_URL}weather?q=${coordinates.city}&appid=${this.API_KEY}&units=imperial`;
  }

  private buildForecastQuery(coordinates: Coordinates): string {
    return `${this.BASE_URL}forecast?q=${coordinates.city}&appid=${this.API_KEY}&units=imperial`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const queryUrl = this.buildWeatherQuery(coordinates);
    const response = await fetch(queryUrl);
    if (!response.ok) {
      throw new Error(`Error: Unable to get weather data`);
    }
    return response.json();
  }

  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {

  }


}
export default new WeatherService();
