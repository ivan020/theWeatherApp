
const currentCity = {
    conditions: "",
    temperature: -1,
}

const toCelsius = (temperature) => {
    return ( (temperature - 32) / 1.8 ).toFixed(2);
}


async function fetchData(location) {
    //location is the physical location of the city (i.e. London);
    //system is the Celsius or Farengheit weather 
    location = location.toLowerCase()
    const key = "";

    try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`);
    const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getCityData(city, isCelsius = true) {
    try {
        const data = await fetchData(city);

        // set the current location variables to the mapping
        let conditions = data["currentConditions"];
        currentCity.conditions = conditions.conditions;

        if (isCelsius) {
            currentCity.temperature = toCelsius(conditions.temp);
        } else {
            currentCity.temperature = conditions.temp;
        }
        return currentCity;

    } catch (error) {
        console.log(error);
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const addDiv = (className, classValue) => {
    const div = document.createElement("div");
    div.className = className;
    div.textContent = `${capitalizeFirstLetter( className )} : ${classValue}`;
    return div;
}

function showWeather() {
    const city = document.getElementById("city-selection").value;
    const indicator = document.getElementById("my-toggle").checked;
    const locationData = getCityData(city, !indicator); //is a promise

    locationData.then((output) => {
        result = document.getElementById("results");
        result.innerText = "";


        for (let key in output) {
            result.appendChild(addDiv(key, output[key]))
        }
    })

}

