import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid'

dotenv.config();
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.API_BASE_URL;
// TODO: Define an interface for the Coordinates object

//given a city, we would search for additional information about this city, like country or state or both,
//then, with this information, we would put it into a query that returns the coordinates of the city.
//then, with the coordinates, we get all the weather and forecast data with that


interface City {
  id: string;
  city: string;
  stateOrProvince?: string;
  country?: string;
}

interface Coordinates {
  lat: number;
  lon: number;
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

  private async fetchCoordinates(city: string, stateOrProvince: string = '', country: string = ''): Promise<any> {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${stateOrProvince},${country}&limit={1}&appid=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`Error: Unable to get weather data`);
    }
    return response.json();
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

  private async fetchForecastData(coordinates: Coordinates): Promise<any> {
    const queryUrl = this.buildForecastQuery(coordinates);
    const response = await fetch(queryUrl);
    if (!response.ok) {
      throw new Error(`Error: Unable to get forecast data`);
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
