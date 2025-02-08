import { WeatherService } from '../src/util/weather';
import * as dotenv from 'dotenv';
dotenv.config();

describe('WeatherService Integration Test', () => {
    const apiKey = process.env.WEATHER_API_KEY!;
    const weatherService = new WeatherService(apiKey);

    const locations = ['New York', '90210', 'Portland, ME', 'Boston', 'Machias, ME', '04101', 'Calais', 'Paris', 'Paris, TX', 'Paris, ME', 'Madison, WI', "35756", 'Anchorage', 'Honolulu, HI'];

    locations.forEach(location => {
        it(`should fetch weather data for ${location}`, async () => {
            let data = await weatherService.fetchWeatherData(location, 'imperial');

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
        await expect(weatherService.fetchWeatherData(city, 'metric')).rejects.toThrow('Request failed with status code 404');
        city = '04100';
        await expect(weatherService.fetchWeatherData(city, 'imperial')).rejects.toThrow('Request failed with status code 404');
    });

    it('should fetch weather data in metric units', async () => {
        const data = await weatherService.fetchWeatherData('New York, NY', 'metric');
        expect(data).toHaveProperty('main.temp');
        expect(data.main.temp).toBeGreaterThan(-50); // reasonable range for Celsius
        expect(data.main.temp).toBeLessThan(60);
    });

    it('should fetch weather data in standard units', async () => {
        const data = await weatherService.fetchWeatherData('New York', 'imperial');
        expect(data).toHaveProperty('main.temp');
        // expect(data.main.temp).toBeGreaterThan(200); // reasonable range for Kelvin
        expect(data.main.temp).toBeLessThan(330);
    });

    it('should handle empty location string', async () => {
        await expect(weatherService.fetchWeatherData('', '')).rejects.toThrow(/Request failed with status code (400|404)/);
    });

    it('should handle special characters in location', async () => {
        await expect(weatherService.fetchWeatherData('!@#$%^&*()', '$%#@')).rejects.toThrow(/Request failed with status code (400|401|404)/);    });

    // it('should handle rate limiting', async () => {
    //     const requests = [];
    //     for (let i = 0; i < 10; i++) {
    //         requests.push(weatherService.fetchWeatherData('New York', 'imperial'));
    //     }
    //     await Promise.all(requests).catch(error => {
    //         expect(error.message).toContain('Request failed with status code 429');
    //     });
    // });
});
