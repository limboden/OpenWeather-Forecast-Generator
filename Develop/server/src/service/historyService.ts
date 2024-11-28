import { v4 as uuid } from 'uuid'
import fs from 'fs'
import path from 'path'

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name: string) {
    this.name = name;
    this.id = uuid();
  }
}

// TODO: Complete the HistoryService class

class HistoryService {

  private filePath: string = path.resolve('db', 'searchHistory.json');

  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch (error) {
      console.error('Error reading file:', error);
      return [];
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    try {
      const data = JSON.stringify(cities, null, 2);
      await fs.promises.writeFile(this.filePath, data, 'utf-8')
    } catch (error) {
      console.error('Error writing to file', error)
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    try {
      let cities = await this.getCities();
      const newCity = new City(city);
      cities.push(newCity);
      await this.write(cities);
      this.read();
    } catch (error) {
      console.error('Error adding city:', error)
    }
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    try {
      let cities = await this.getCities();
      cities = cities.filter(city => city.id !== id);
      await this.write(cities);
    } catch (error) {
      console.error('Error removing city:', error);
    }
  }
}

export default new HistoryService();
