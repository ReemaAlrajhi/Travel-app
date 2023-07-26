import Litepicker from 'litepicker';
const { DateTime } = require("luxon");


const setDuration = (startDate, endDate) => {

    let dateDiff = endDate.diff(startDate, 'days');
    const duration = dateDiff.values.days;
    return duration
}


export { setDuration }