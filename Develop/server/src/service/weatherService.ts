import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid'

dotenv.config();
const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.API_BASE_URL;
// TODO: Define an interface for the Coordinates object

//given a city, we would search for additional information about this city, like country or state or both,
//then, with this information, we would put it into a query that returns the coordinates of the city.
//then, with the coordinates, we get all the weather and forecast data with that

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

  addTheRest(date: string, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number) {
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription
    this.tempF = tempF;
    this.windSpeed = windSpeed
    this.humidity = humidity
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  BASE_URL = BASE_URL
  API_KEY = API_KEY;
  cityName: string = ''

  // , stateOrProvince: string = '', country: string = '' |||||  ,${stateOrProvince},${country}
  private async fetchCoordinates(city: string): Promise<any> {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`Error: Unable to get weather data`);
    }
    console.log(JSON.stringify(response))
    return response.json();
  }

  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${BASE_URL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=imperial`
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

  private formatCityToCoordinatesJSON(response: any): Coordinates {
    console.log(response)
    const cityLat = response[0].lat
    const cityLon = response[0].lat
    return { lat: cityLat, lon: cityLon }
  }


  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any, city: string): Weather {
    const currentWeatherJSON = response.list[0]
    const currentTemp = currentWeatherJSON.main.temp
    const currentHumidity = currentWeatherJSON.main.humidity
    const currentWeatherDescription = currentWeatherJSON.weather[0].iconDescription
    const currentWeatherIcon = currentWeatherJSON.weather[0].icon
    const currentWindSpeed = currentWeatherJSON.wind.speed
    const currentDate = currentWeatherJSON.dt_txt

    const currentWeather = new Weather(city)
    currentWeather.addTheRest(currentDate, currentWeatherIcon, currentWeatherDescription, currentTemp, currentWindSpeed, currentHumidity)

    return currentWeather
  }

  private parseWeatherForecast(response: any, city: string): Weather[] {
    let isToday = true;
    const fiveDayForecast = [];
    const forecastList = response.list;
    for (let i = 0; i < forecastList.length; i++) {
      const dateTimeText: string = forecastList[i].dt_txt
      if (dateTimeText.endsWith("00:00:00")) {
        isToday = false;
      }
      if (dateTimeText.endsWith("12:00:00") && !isToday) {
        console.log(JSON.stringify(forecastList))
        const currentWeatherJSON = forecastList[i]
        const currentTemp = currentWeatherJSON.main.temp
        const currentHumidity = currentWeatherJSON.main.humidity
        const currentWeatherDescription = currentWeatherJSON.weather[0].iconDescription
        const currentWeatherIcon = currentWeatherJSON.weather[0].icon
        const currentWindSpeed = currentWeatherJSON.wind.speed
        const currentDate = currentWeatherJSON.dt_txt

        const currentWeather = new Weather(city)
        currentWeather.addTheRest(currentDate, currentWeatherIcon, currentWeatherDescription, currentTemp, currentWindSpeed, currentHumidity)

        fiveDayForecast.push(currentWeather)
      }
    }
    return fiveDayForecast

  }

  async getWeatherForCity(city: string): Promise<Weather[]> {
    const cityCoordinatesJSON = await this.fetchCoordinates(city)
    const cityCoordinates = this.formatCityToCoordinatesJSON(cityCoordinatesJSON)
    const fetchedWeatherDataBasedOnCoordinates = await this.fetchWeatherData(cityCoordinates) // this is the giant JSON at https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=%3Cspan%20class=
    const currentWeather = this.parseCurrentWeather(fetchedWeatherDataBasedOnCoordinates, city)
    // currentWeather is a Weather Object!!!!
    const forecast = this.parseWeatherForecast(fetchedWeatherDataBasedOnCoordinates, city)

    const returnArray = [currentWeather, ...forecast]


    return returnArray


  }


}
export default new WeatherService();
