import { WeatherService } from '../src/util/weather';

import * as dotenv from 'dotenv';
dotenv.config();

describe('WeatherService Integration Test', () => {
    const apiKey = process.env.WEATHER_API_KEY!;
    const weatherService = new WeatherService(apiKey);

    const locations = ['New York', '90210', 'Portland, ME', 'Boston', 'Machias, ME', '04101', 'Calais', 'Paris', 'Anchorage', 'Honolulu, HI'];
    // const locations = ["Lubec, ME"]; lon returns -0.918, but should be -66.9871
    locations.forEach(location => {
        it(`should fetch weather data for ${location}`, async () => {
            const data = await weatherService.fetchWeatherData(location);

            expect(data).toHaveProperty('name');
            expect(data).toHaveProperty('main.temp');
            expect(data).toHaveProperty('weather');
            expect(data).toHaveProperty('wind.speed');

            // us cities/states fall in this range including AK & HI
            expect(data.coord.lat).toBeGreaterThanOrEqual(20);
            expect(data.coord.lat).toBeLessThanOrEqual(62);
            expect(data.coord.lon).toBeGreaterThanOrEqual(-160);
            expect(data.coord.lon).toBeLessThanOrEqual(-67);
        });
    });

    it('should handle errors when fetching weather data', async () => {
        let city = 'InvalidCity';
        await expect(weatherService.fetchWeatherData(city)).rejects.toThrow('Request failed with status code 404');
        city = '04100';
        await expect(weatherService.fetchWeatherData(city)).rejects.toThrow('Request failed with status code 404');

    });


});
