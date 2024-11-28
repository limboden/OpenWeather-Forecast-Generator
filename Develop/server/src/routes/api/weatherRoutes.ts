import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// : POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // : GET weather data from city name
  try {
    const cityName = req.body.cityName

    if (!cityName) {
      return res.send({ error: 'City name is required.' })
    }
    const weatherData = await WeatherService.getWeatherForCity(req.body.cityName)
    // : save city to search history
    await HistoryService.addCity(weatherData[0].city);

    return res.send(weatherData);
  } catch (err: any) {
    console.log(err);
    return res.send({ error: err.message })
  }

});


router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    if (cities.length === 0) {
      return res.send({ message: 'No cities in search history.' });
    }
    return res.send(cities);
  } catch (err: any) {
    console.log(err);
    return res.send({ error: err.message });
  }
});

router.delete('/history/:id', async (req: Request, res: Response) => {
  let response = HistoryService.removeCity(req.params.id);
  res.send(response);
});


export default router;
