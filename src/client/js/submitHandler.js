import { postData } from './app';


function handleSubmit(event) {
    event.preventDefault()
    var from =document.getElementById('from')
    var to =document.getElementById('to')

    const duration = calcDuration(from.value, to.value);
    const userInput = document.getElementById('city').value;
    postData(userInput, duration)
    .then((res) => {

        const cityName = res[2].geonames[0].toponymName;
        const countryName = res[2].geonames[0].countryName
        document.getElementById('result').classList.remove('hide');

        //image
        document.getElementById("img").setAttribute('src', res[1].hits[0].largeImageURL);
        document.getElementById("img").setAttribute('alt', res[2].geonames[0].toponymName)
        document.getElementById('figcaption').textContent = cityName+" , "+countryName;

        //info
        document.getElementById('cityAndCountry').textContent=cityName+" - "+countryName;
        document.getElementById('days').textContent=duration
        document.getElementById('temp').textContent=res[0].data[0].temp;
        document.getElementById('description').textContent = res[0].data[0].weather.description;

     

    })
}

function setDate(event) {
    document.getElementById("from").min = new Date().toISOString().split("T")[0];
    document.getElementById("to").min =document.getElementById("from").value;
    if(event.srcElement.id =="from")
    {      
        document.getElementById("to").valueAsDate = null;
    }

}

const calcDuration = (startDate, endDate) => {

    var date1 = new Date(startDate)
    var date2 = new Date(endDate)
    var diffDays = Math.abs((date1.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000));
    return diffDays
}




export { handleSubmit,setDate }