import Litepicker from 'litepicker';
import { postData } from './app';
import { displayWeather } from './weather';
// console.log('submitHandler')

// const { DateTime } = require("luxon");
// const loader = document.getElementById('loading');
// const results = document.getElementById('results');

// Reset values when reloading page
// window.onload = function () {
//     document.getElementById('city').value = "";
//     document.getElementById('pickerstart').value = DateTime.now().toISODate();
//     document.getElementById('pickerend').value = 'YYYY-MM-DD';

//     // Setting up date picker
//     const today = DateTime.now();
//     const maxDate = DateTime.now().plus({ days: 16 });
//     new Litepicker({
//         element: document.getElementById('pickerstart'),
//         elementEnd: document.getElementById('pickerend'),
//         singleMode: false,
//         allowRepick: true,
//         autoRefresh: true,
//         minDate: today,
//         maxDate: maxDate,
//         tooltipNumber: (totalDays) => {
//             return totalDays - 1;
//         }
//     });
// }

function handleSubmit(event) {
    event.preventDefault()
    // results.classList.remove('hide');
    // loader.classList.remove('hide');
    var from =document.getElementById('from')
    var to =document.getElementById('to')

    // console.log("handel submit ",x.value);
    // const startDate = DateTime.fromISO(document.getElementById('pickerstart').value);
    // const endDate = DateTime.fromISO(document.getElementById('pickerend').value);
    // Save duration value in a variable
    const duration = calcDuration(from.value, to.value);
    const userInput = document.getElementById('city').value;
    postData(userInput, duration)
    .then((res) => {
        
        console.log(res);
        const cityName = `${res[2].geonames[0].toponymName}`;
        const countryName = `${res[2].geonames[0].countryName}`;

        // loader.classList.add('hide');
        const inputs = document.getElementById("destination-pic");
        inputs.classList.remove('hide');
        // Posting image
        img.setAttribute('src', `${res[1].hits[0].largeImageURL}`);
        img.setAttribute('alt', `Photo of ${res[2].geonames[0].toponymName}`)

        // Posting destination name in title and figcaption
        document.getElementById('location').textContent = `${cityName}, ${countryName}`;
        document.getElementById('figcaption').textContent = `${cityName}, ${countryName}`;

        // Posting weather
        displayWeather(duration, res);
    })
}


const calcDuration = (startDate, endDate) => {

    var date1 = new Date(startDate)
    var date2 = new Date(endDate)
    var diffDays = Math.abs((date1.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000));
    return diffDays
}




export { handleSubmit }