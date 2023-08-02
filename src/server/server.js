const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();



const geoURL = "http://api.geonames.org/searchJSON?q=";
const geoKey = process.env.GEONAMES_KEY;

const imgURL='https://pixabay.com/api/?key=';
const imgKey = process.env.IMG_KEY;

const weatherURL= 'https://api.weatherbit.io/v2.0/'
const weatherKey = process.env.WEATHER_KEY;


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));


app.listen(2030, function () {
    console.log('Example app listening on port 2030!')
})


app.get('/', function (request, response) {
    response.sendFile(path.resolve('dist/index.html'))
});


app.post('/chcekWeather', chcekWeather);
async function chcekWeather(request, response) {
    const city = request.body.userInput;
    getCoordinates(city).then((cityData) => {
        const duration = request.body.duration;
        const country = cityData.geonames[0].countryName;
        const lat = cityData.geonames[0].lat;
        const lon = cityData.geonames[0].lng;
        getImage(city, country).then((image) => {
            getWeather(lat, lon, duration).then((weather) =>{
                try {
                    response.send([weather, image, cityData]);
                }
                catch (error) {
                    console.log('Error in the chcekWeather function: ',error);
                }
            })
        })
    })
};

async function getCoordinates(city) {
    const response = await fetch(geoURL+city+geoKey);
    try {
        const cityData = await response.json();
        return cityData;
    }
    catch (error) {
        console.log('Error in getCoordinates : ', error);
    }
}


async function getImage(city, country) {
    const pixaResponse = await fetch(imgURL+imgKey+'&q='+city+"+"+country);
    try {
        const image = await pixaResponse.json();
        return image;
    }
    catch (error) {
        console.log('Error in the getImage : ', error);
    }
}


async function getWeather(lat, lon, duration) {
    if (duration >= 7) {
        const weatherResponse = await fetch(weatherURL+'forecast/daily?lat='+lat+'&lon='+lon+'&days='+duration+'&key='+weatherKey);
        try {
            const weather = await weatherResponse.json();
            return weather;
        }
        catch (error) {
            console.log('Error in the getWeather : ', error);
        }
    } else

    if (duration > 0 && duration < 7) {
        const weatherResponse = await fetch(weatherURL+'current?lat='+lat+'&lon='+lon+'&key='+weatherKey);
        try {
            const weather = await weatherResponse.json();
            return weather;
        }
        catch (error) {
            console.log('Error in the getWeather : ', error);
        }
    } 
}