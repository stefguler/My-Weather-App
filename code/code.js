
document.querySelector('form').addEventListener("submit", e => {
    e.preventDefault();

    const city = document.querySelector('.cityInput').value
    const api_key = 'c0d9799d936ec2a8d83a829cf6c15d29'
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`

    getData(api_url)

});


async function getData(api_url) {
    const respone = await fetch(api_url)
    const data = await respone.json()
    writeData(data)

}

function writeData(data) {
    console.log(data)
    let template = ''
    document.querySelector('.output').innerHTML = ''
    
    if (data.cod != '404') {
       template = `
       <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="currentWeatherLogo">
       <p>It is</p>
       <p class="temp">${data.main.temp} C°</p>
       <p>in ${data.name}</p>
       <div class="weather_data">
           <p>It feels like <span class="feels">${data.main.feels_like} °C</span>, while <span>${data.weather[0].description}.</span></p>
           <p>Minimun observed temparature: <span class="feels">${data.main.temp_min} °C</span><p>
           <p>Maximum observed temparature: <span class="feels">${data.main.temp_max} °C</span></p>
           <div class="weather_details">
            <ul>
                <li><i class="fa-solid fa-droplet"></i>Humidity: <span class="details">${data.main.humidity} %</span></li>
                <li><i class="fa-solid fa-wind" style="transform: rotate(${data.wind.deg}deg);"></i>Speed: <span class="details">${data.wind.speed} m/s</span></li>
                <li><i class="fa-solid fa-compress"></i>Pressure: <span class="details">${data.main.pressure} hPa</span></li>
                <li><i class="fa-solid fa-eye"></i>Visibility: <span class="details">${data.visibility} m</span></li>
                <li><i class="fa-solid fa-cloud"></i>Cloudiness: <span class="details">${data.clouds.all} %</span></li>
            </ul>
            </div>
        <div class="sunrise-set-data">
            <ul>
                <li><i class="fa-solid fa-sort-up"></i>Sunrise: <span class="details">${convertUnixToTime(data.sys.sunrise)}</span></li>
                <li><i class="fa-solid fa-sort-down"></i>Sunset: <span class="details">${convertUnixToTime(data.sys.sunset)}</span></li>
            </ul>
        </div>
       </div>      
       ` 
    } else {

        template = 'city not found'
    }

    document.querySelector('.output').innerHTML = template
}

//Unix to time converter

function convertUnixToTime(unix) {
    const date = new Date(unix * 1000)
    return date.toLocaleTimeString("en-US")
}


// Dark Mode Toggle

document.querySelector('header > div > h1 > i').addEventListener('click', e => {
    document.body.classList.toggle('dark')
    document.querySelector('header > div > h1 > i').classList.toggle('fa-moon')
    document.querySelector('header > div > h1 > i').classList.toggle('fa-sun')
  
  })