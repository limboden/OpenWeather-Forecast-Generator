import dotenv from 'dotenv';

dotenv.config();
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.API_BASE_URL;
// TODO: Define an interface for the Coordinates object

interface Coordinates {
  lat: number,
  lon: number
}

// TODO: Define a class for the Weather object
class Weather {

}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL = `${BASE_URL}/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;
  API_KEY = API_KEY;

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {


    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}
    const latFromData = data[0].lat;
    const lonFromData = data[0].lon

  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return { lat, lon }

  }
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const coords = this.destructureLocationData(coordinates);

    fetch(`${BASE_URL}/geo/1.0/reverse?lat=${coords.lat}&lon=${coords.lon}&limit=1&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {

  }


}
export default new WeatherService();
