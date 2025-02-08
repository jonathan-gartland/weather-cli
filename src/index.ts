import { WeatherService } from "./util/weather";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 <locations...> [options]')
  .demandCommand(1, 'You need to provide at least one location')
  .option('api_key', {
      alias: 'k',
      type: 'string',
      description: 'API key for the weather service',
  })
  .help()
  .alias('help', 'h')
  .argv as { _: string[], api_key?: string };

const apiKey = argv.api_key || process.env.WEATHER_API_KEY;

if (!apiKey) {
    console.error('Error: API key must be provided either as an argument or environment variable.');
    process.exit(1);
}

const weatherService = new WeatherService(apiKey);

async function getWeather(location: string) {
    try {
        const data = await weatherService.fetchWeatherData(location, 'imperial');
        console.log(`Weather data for ${data.name}:`);
        console.log(`Temperature: ${data.main.temp}°C`);
        console.log(`Description: ${data.weather[0].description}`);
        console.log(`Feels like: ${data.main.feels_like}°C`);
        console.log(`Humidity: ${data.main.humidity}%`);
        console.log(`Pressure: ${data.main.pressure}`);
        console.log(`Wind Speed: ${data.wind.speed}m/s\n---------------\n`);
    } catch (error) {
        console.error('Error fetching weather data:', (error as Error).message);
    }
}

argv._.forEach(location => {
    getWeather(location);
});
