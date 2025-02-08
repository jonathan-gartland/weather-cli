![Node.js Version](https://img.shields.io/badge/Node.js-22.12.0-brightgreen) [![Node.js CI](https://github.com/jonathan-gartland/weather-cli/actions/workflows/main.yml/badge.svg)](https://github.com/jonathan-gartland/weather-cli/actions/workflows/main.yml)  


# weather-cli demo app
Built with these technologies:  
![Axios Badge](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=fff&style=for-the-badge) 
![IntelliJ IDEA](https://img.shields.io/badge/IntelliJ%20IDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) 
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) 
![NodeJS](https://img.shields.io/badge/-Node.js-%23339933?&style=for-the-badge&logo=npm&logoColor=white)  
  


A simple demo app for the OpenWeatherMap API, with some tests.
  
You will need a valid OpenWeatherMap API Key to run this app.  
You can get one [here](https://home.openweathermap.org/users/sign_up).  
  

## Installation  
```
$> git clone https://github.com/jonathan-gartland/weather-cli.git
$> cd weather-cli
$> npm install
$> npm run build
```  
  
### Either of the following commands will run the app:  
## Usage  
```
$> node dist/index.js --api_key <YOUR_API_KEY> "New York" "Portland, ME" "Honolulu, HI" "Anchorage" "04652"
```
### or
``` 
$> npm run start -- --api_key <YOUR_API_KEY> "New York" "Portland, ME" "Honolulu, HI" "Anchorage" "04652" 
```


### Here is an example running a test for New York, NY:

![Image 2](weath-cli-output-example.jpg)
  
  
## Testing  
To run the tests, a local .env file with the WEATHER_API_KEY is required.  
```
echo "WEATHER_API_KEY=<YOUR_API_KEY>" > .env
npm run test
```  
## Local
![tests](tests.jpg)  

## GitHub Actions  
#### These run any time a push is made to the main branch. 
![ghactions](githubtests.jpg)  
