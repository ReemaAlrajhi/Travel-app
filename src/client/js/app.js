import fetch from 'node-fetch';

const postData = async (userInput, duration) => {
    console.log('inpost data',userInput, duration)

    const res = await fetch('http://localhost:2030/appData', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput, duration }),
    })
    try {
        const newData = await res.json();
        console.log("newData ",newData);
        return newData;
    }
    catch (error) {
        console.log('Error in the postData : ', error);
    }
}

export { postData }