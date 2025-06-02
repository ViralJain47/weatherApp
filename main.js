const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const weatherCard = document.querySelector(".weatherCard");
const apikey = "7ab6c76b73c741bd86754819251501";

weatherForm.addEventListener("submit",async event => {

    // as form has the default property to refresh the page and we want to prevent that
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.log(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a valid city name");
    }
})

async function getWeatherData(city){
    const api = `https://api.weatherapi.com/v1/current.json?key=7ab6c76b73c741bd86754819251501&q=${city}&aqi=no`;

    const response = await fetch(api);
    // console.log(response);

    if(!response.ok){
        throw new Error("Could'nt fetch the Data");
    }

    return await response.json();
}

function displayWeatherInfo(data){
    console.log(data);
     const {location : {name : city},
            current :{condition:{icon : icon,text : text},
            humidity : humidity,
            temp_c : temp}} = data;

    weatherCard.textContent = "";

    const cityDisplay = document.createElement("h1");
    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay");
    weatherCard.appendChild(cityDisplay);

    const tempDisplay = document.createElement("p");
    tempDisplay.textContent = `${temp}°C`;
    tempDisplay.classList.add("tempDisplay");
    weatherCard.appendChild(tempDisplay);

    const humidityDisplay = document.createElement("p");
    humidityDisplay.textContent = `humidity : ${humidity}`;
    humidityDisplay.classList.add("humidityDisplay");
    weatherCard.appendChild(humidityDisplay);

    const descDisplay = document.createElement("p");
    descDisplay.textContent = text;
    descDisplay.classList.add("descDisplay");
    weatherCard.appendChild(descDisplay);

    const weatherEmoji = document.createElement("img");
    weatherEmoji.src = icon;
    weatherEmoji.classList.add("weatherEmoji");
    weatherCard.appendChild(weatherEmoji);

    weatherCard.style.display = "flex";

}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    weatherCard.textContent = "";
    weatherCard.style.display = "flex";
    weatherCard.appendChild(errorDisplay);
}