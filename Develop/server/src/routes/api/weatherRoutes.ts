import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const cityName = req.body.cityName

  if (!cityName) {
    return res.send({ error: 'City name is required.' })
  }
  const weatherData = await WeatherService.getWeatherForCity(req.body.cityName)
  // TODO: save city to search history
  await HistoryService.addCity(weatherData[0].city);

  return res.send(weatherData);


  HistoryService.addCity(req.body.cityName)
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => { });

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => { });

export default router;
