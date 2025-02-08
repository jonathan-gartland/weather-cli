import axios from 'axios';

export interface WeatherData {
    coord: {
        lon: number;
        lat: number;
    };
    name: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    weather: { description: string }[];
    wind: { speed: number };
}

export class WeatherService {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async fetchWeatherData(city: string): Promise<WeatherData> {
        const response = await axios.get<WeatherData>(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},US&appid=${this.apiKey}&units=imperial`
        );
        return response.data;
    }
}

