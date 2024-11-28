import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  try {
    const cityName = req.body.cityName

    if (!cityName) {
      return res.send({ error: 'City name is required.' })
    }
    const weatherData = await WeatherService.getWeatherForCity(req.body.cityName)
    // TODO: save city to search history
    await HistoryService.addCity(weatherData[0].city);

    return res.send(weatherData);
  } catch (err: any) {
    console.log(err);
    return res.send({ error: err.message })
  }

});

router.get('/history', async (_req: Request, res: Response) => {
  const cities = HistoryService.getCities();
  console.log('city search history');
  res.send(cities);
});

router.delete('/history/:id', async (req: Request, res: Response) => {
  let response = HistoryService.removeCity(req.params.id);
  res.send(response);
});


export default router;
