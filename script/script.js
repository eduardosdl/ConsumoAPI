const button = document.querySelector("#btn");
const input = document.querySelector("#search");

// evento para identificar o click
button.addEventListener('click', getCity);
// evento para identificar o 'enter'
input.addEventListener('keypress', (ev) => {
    if(ev.key == 'Enter') {
        getCity();
    }
});


function getCity () {
    const city = input.value
    const urlCity = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=8f77d0065bcd16d453b9e3093004900c#`;

    if (!input.value) {
        input.classList.add('danger');
    } else {
        input.classList.remove('danger');
        fetch(urlCity).then(res => res.json()).then((dataCity) => {
            document.querySelector('#cityName').innerHTML = `${dataCity[0].name}, ${dataCity[0].country}`;
            getClimate(dataCity[0].lat, dataCity[0].lon);
        }).catch((err) => {
            alert("Houve um erro, tente novamente");
            console.log(err);
        });

        input.value = "";
    }
}

function getClimate(lat, lon) {
    const urlClimate = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&lang=pt_br&appid=8f77d0065bcd16d453b9e3093004900c#`;

    fetch(urlClimate).then(res => res.json()).then((dataClimate) => {
        console.log(dataClimate);
        climateCurrent(dataClimate);
        climateHour(dataClimate.hourly);

    }).catch((err) => {
        alert("Houve um erro, tente novamente");
        console.log(err);
    });
}

function climateCurrent (data) {
    const date = new Date(data.current.dt*1000);
    const dateFormted = (new Intl.DateTimeFormat('pt-BR').format(date));
    const hour = `${date.getHours()}:${date.getMinutes()}`;

    document.querySelector('#dateCurrent').innerHTML = dateFormted;
    document.querySelector('#hourCurrent').innerHTML = hour;

    document.querySelector('#tempCurrent').innerHTML = `${data.current.temp.toFixed(1)}&deg;C`;
    document.querySelector('#tempCurrent').setAttribute('src',`../img/${data.current.weather[0].icon}.png`);
    document.querySelector('#descCurrent').innerHTML = data.current.weather[0].description;
    
    document.querySelector('#maxCurrent').innerHTML = `${data.daily[0].temp.max.toFixed(1)}&deg;C`;
    document.querySelector('#minCurrent').innerHTML = `${data.daily[0].temp.min.toFixed(1)}&deg;C`;
}

function climateHour (data) {
    const list = document.querySelector('#previousHour');

    for (const hour of data) {
        const date = new Date(hour.dt*1000);

        const cardHour = createCard({
            hour: `${date.getHours()}:${date.getMinutes().toLocaleString()}`,
            img: `../img/${hour.weather[0].icon}.png`,
            temp: `${hour.temp.toFixed(1)}&deg;C`,
        });

        list.append(cardHour);
        
    }
}

function createCard(content) {
    const card = document.createElement('li');
    const hour = document.createElement('h5');
    const img = document.createElement('img');
    const temp = document.createElement('h5');

    card.setAttribute('class', 'mx-2 px-2 rounded d-flex lign-items-center flex-column');
    hour.classList.add('fs-5');
    temp.classList.add('fs-5');

    img.setAttribute('src', content.img);
    hour.innerHTML = content.hour;
    temp.innerHTML = content.temp;

    card.append(hour);
    card.append(img);
    card.append(temp);

    return card;
}