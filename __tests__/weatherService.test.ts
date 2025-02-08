import axios from "axios";
import { WeatherService, type WeatherData } from "../src/util/weather";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("WeatherService", () => {
  const apiKey = "test_api_key";
  const weatherService = new WeatherService(apiKey);

  const mockWeatherData: WeatherData = {
    coord: { lon: -122.08, lat: 37.39 },
    name: "Test City",
    main: {
      temp: 70,
      feels_like: 68,
      humidity: 50,
      pressure: 1012,
    },
    weather: [{ description: "clear sky" }],
    wind: { speed: 5 },
  };

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockWeatherData });
  });

  it("should fetch weather data for New York", async () => {
    const data = await weatherService.fetchWeatherData("New York");
    expect(data).toEqual(mockWeatherData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?q=New York,US&appid=${apiKey}&units=imperial`
    );
  });

  it("should fetch weather data for 90210", async () => {
    const data = await weatherService.fetchWeatherData("90210");
    expect(data).toEqual(mockWeatherData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?q=90210,US&appid=${apiKey}&units=imperial`
    );
  });

  it("should fetch weather data for Portland, ME", async () => {
    const data = await weatherService.fetchWeatherData("Portland, ME");
    expect(data).toEqual(mockWeatherData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?q=Portland, ME,US&appid=${apiKey}&units=imperial`
    );
  });

  it("should fetch weather data for Boston", async () => {
    const data = await weatherService.fetchWeatherData("Boston");
    expect(data).toEqual(mockWeatherData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?q=Boston,US&appid=${apiKey}&units=imperial`
    );
  });

  it("should fetch weather data for Lubec, ME", async () => {
    const data = await weatherService.fetchWeatherData("Lubec, ME");
    expect(data).toEqual(mockWeatherData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?q=Lubec, ME,US&appid=${apiKey}&units=imperial`
    );
  });

  it("should fetch weather data for Machias, ME", async () => {
    const data = await weatherService.fetchWeatherData("Machias, ME");
    expect(data).toEqual(mockWeatherData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?q=Machias, ME,US&appid=${apiKey}&units=imperial`
    );
  });
});
