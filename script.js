// Add your OpenWeather API key here
const apiKey = '213368850f85ea7118ab24182c1750c5';

// Get user's location and fetch weather data
function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                    recommendOutfit(data.main.temp);
                })
                .catch(error => {
                    document.getElementById('weather-info').innerText = "Unable to retrieve weather data.";
                    console.error(error);
                });
        });
    } else {
        document.getElementById('weather-info').innerText = "Geolocation is not supported by this browser.";
    }
}

// Display weather information
function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const temp = data.main.temp;
    const weather = data.weather[0].description;
    weatherInfo.innerHTML = `The temperature is ${temp}°C and the weather is ${weather}.`;
}

// Recommend outfits based on temperature
function recommendOutfit(temp) {
    const outfitRecommendation = document.getElementById('outfit-recommendation');
    let outfit;

    if (temp > 30) {
    outfit = "Very hot! Wear a T-shirt and shorts, stay hydrated.";
} else if (temp > 25) {
    outfit = "Hot! Wear a T-shirt and shorts.";
} else if (temp > 20) {
    outfit = "Warm! Wear a T-shirt and jeans or light pants.";
} else if (temp > 15) {
    outfit = "Mild! Wear long sleeves or a light sweater.";
} else if (temp > 10) {
    outfit = "Cool! Wear a jacket or hoodie.";
} else if (temp > 5) {
    outfit = "Chilly! Wear a warm jacket, maybe a scarf.";
} else {
    outfit = "Cold! Wear a heavy coat, scarf, gloves, and warm pants.";
}

    outfitRecommendation.innerHTML = `<h2>Outfit Recommendation:</h2><p>${outfit}</p>`;
}

// Call the function on page load
window.onload = getWeather;
