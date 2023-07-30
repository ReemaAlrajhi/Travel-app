/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=' 

// Personal API KEY For OpenWeatherMap API
const apiKey = '&appid=9d1de02b33e63ea117171812c83ab36c&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', retrieveData);

function retrieveData(){
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

  getWeather(baseURL,zip, apiKey).then(function(data){
        postData('http://localhost:2030/add', {
          date: newDate , 
          temp: Math.round(data.main.temp),
          fellings:feelings
      })
    })
    }

const getWeather = async (baseURL,zip, apiKey)=>{

 
    const res = await fetch(baseURL+zip+apiKey)
      try { 
      const data = await res.json();
      console.log(data)
      return data;
    }  catch(error) {
      console.log("error: ", error);
    }
  }


const postData = async ( url = '', data = {})=> {
    const res = await fetch (url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      fellings: data.fellings
    }), 
  });
    try {
        updateUI()

    }catch(error) {
        console.log("error: ", error);
    };
};

const updateUI = async () => {
    const req = await fetch('http://localhost:2030/all');

    try{
     const data = await req.json();
     document.getElementById('date').innerHTML = 'Date: ' + data.date ; 
     document.getElementById('temp').innerHTML = 'Temperature: ' + Math.round(data.temp); 
     document.getElementById('content').innerHTML = 'feeling: ' + data.feel ;
 
    }catch(error){
     console.log("error: ", error);
    };
 
 };