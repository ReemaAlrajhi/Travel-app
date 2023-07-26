const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
require('dotenv').config();


// Global variables
let cityData;
let geoInfo={}
const geoURL = "http://api.geonames.org/searchJSON?q=";
const geoKey = process.env.GEONAMES_KEY;

const weatherURL= 'https://api.weatherbit.io/v2.0/'
const weatherKey = process.env.WEATHER_KEY;

const imgURL='https://pixabay.com/api/?key=';
const imgKey = process.env.IMG_KEY;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));


app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

// Add city
app.post('/add', (req, res) => {
  cityData = req.body;
  res.send(cityData);
});

// Get all city
app.get('/all', (req, res) => {
  res.send(cityData);
});


app.post('/appData', addData);

async function addData(request, response) {
    const city = request.body.userInput;

    getCoordinates(city).then((cityData) => {
        const duration = request.body.duration;
        const country = cityData.geonames[0].countryName;
        const lat = cityData.geonames[0].lat;
        const lon = cityData.geonames[0].lng;
        getImage(city, country).then((image) => {
            getWeather(lat, lon, duration).then((weather) =>{
                try {
                    // Send response as an array, with data from Weatherbit, Pixabay and Geonames APIs
                    response.send([weather, image, cityData]);
                }
                catch (error) {
                    console.log('Error in the addData function: ',error);
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
    const pixaResponse = await fetch(imgURL+imgKey+'&q='+city+country);
    try {
        const image = await pixaResponse.json();
        return image;
    }
    catch (error) {
        console.log('Error in the getImage : ', error);
    }
}

async function getWeather(lat, lon, duration) {
    // If the duration of the trip is equal or longer than 7 days, get the forecast.
    if (duration >= 7) {
        const weatherResponse = await fetch(weatherURL+'forecast/daily?lat='+lat+'&lon='+lon+'days='+duration+'&key='+weatherKey);
        try {
            const weather = await weatherResponse.json();
            return weather;
        }
        catch (error) {
            console.log('Error in the getWeather : ', error);
        }
    } else
    if (duration > 0 && duration < 7) {
        const weatherResponse = await fetch(weatherURL+'current?lat='+lat+'&lon='+lon+'key='+weatherKey);
        try {
            const weather = await weatherResponse.json();
            return weather;
        }
        catch (error) {
            console.log('Error in the getWeather : ', error);
        }
    } 
}
// // GET route for weather forecast for 16 days
// app.get('/weather/:destinationId', async (req, res) => {
//   const id = parseInt(req.params.destinationId);
//   let lat;
//   let lng;
//   const geonamesData = cityData.geonames;

//   for (let i = 0; i < geonamesData.length; i++) {
//     if (geonamesData[i].geonameId === id) {
//       lat = geonamesData[i].lat;
//       lng = geonamesData[i].lng;
//       break;
//     }
//   }

//   const apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?lat='+lat+'&lon='+lng+'&key='+weatherAPIKey;

//   const response = await fetch(apiUrl);
//   try {
//     const json = await response.json();
//     res.json(json);
//   } catch (err) {
//     console.log('Error: ', err);
//   }
// });

// // GET route for pixabay image
// app.get('/image/:destinationId', async (req, res) => {
//   const id = parseInt(req.params.destinationId);
//   let destination = '';
//   const geonamesData = cityData.geonames;

//   for (let i = 0; i < geonamesData.length; i++) {
//     if (geonamesData[i].geonameId === id) {
//       destination = geonamesData[i].name;
//       break;
//     }
//   }

//   const apiUrl = `https://pixabay.com/api/?key=${imgAPIKey}&q=${destination}&image_type=photo`;

//   const response = await fetch(apiUrl);
//   try {
//     const imgInfo = await response.json();
//     res.json(imgInfo);
//   } catch (err) {
//     console.log('Error: ', err);
//     res.json({ total: 0, totalHits: 0, hits: [] });
//   }
// });

// module.exports = app;