import dotenv from 'dotenv';
dotenv.config();
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.API_BASE_URL;
// TODO: Define an interface for the Coordinates object
// TODO: Define a class for the Weather object

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL = `${BASE_URL}/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;
  API_KEY = API_KEY;

  // TODO: Create fetchLocationData method
  private async fetchLocationData(cityName: string, stateCode: number, countryCode: string, limit: string) {
    await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}


}
export default new WeatherService();
