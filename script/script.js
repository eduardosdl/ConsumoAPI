// selecionando elementos de busca
const button = document.querySelector("#btn");
const input = document.querySelector("#search");
const listHour = document.querySelector('#previousHour');
const listDay = document.querySelector('#previousDaily');


// evento para identificar o click
button.addEventListener('click', getCity);
// evento para identificar o 'enter'
input.addEventListener('keypress', (ev) => {
    if(ev.key == 'Enter') {
        getCity();
    }
});

// busca a latitude e longitade da cidade informada
function getCity () {
    // limpa as listas horaria e diaria de clima
    listHour.innerHTML = "";
    listDay.innerHTML = "";

    const city = input.value
    const urlCity = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=8f77d0065bcd16d453b9e3093004900c#`;

    // verifica o valor do input
    if (!input.value) {
        input.classList.add('danger');
    } else {
        input.classList.remove('danger');
        fetch(urlCity).then(res => res.json()).then((dataCity) => {
            document.querySelector('#cityName').innerHTML = `${dataCity[0].name}, ${dataCity[0].country}`;
            getClimate(dataCity[0].lat, dataCity[0].lon);
        }).catch((err) => {
            console.log("Houve um erro, tente novamente: "+err);
        });

        input.value = "";
    }
}

// busca o clima de acordo com a lat e lon
function getClimate(lat, lon) {
    const urlClimate = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&lang=pt_br&appid=8f77d0065bcd16d453b9e3093004900c#`;

    // conta a api
    fetch(urlClimate).then(res => res.json()).then((dataClimate) => {
        console.log(dataClimate);
        climateCurrent(dataClimate);
        climateHour(dataClimate.hourly);
        climateDay(dataClimate.daily);

    }).catch((err) => {
        console.log("Houve um erro, tente novamente: "+err);
    });
}

// atualiza as informacoes do clima atual
function climateCurrent (data) {
    const date = new Date(data.current.dt*1000);
    const dateFormted = date.toLocaleDateString()
    const hour = date.toLocaleTimeString().slice(0,5);

    document.querySelector('#dateCurrent').innerHTML = dateFormted;
    document.querySelector('#hourCurrent').innerHTML = hour;

    document.querySelector('#tempCurrent').innerHTML = `${data.current.temp.toFixed(1)}&deg;C`;
    document.querySelector('#tempCurrent').setAttribute('src',`../img/${data.current.weather[0].icon}.png`);
    document.querySelector('#descCurrent').innerHTML = data.current.weather[0].description;
    
    document.querySelector('#maxCurrent').innerHTML = `${data.daily[0].temp.max.toFixed(1)}&deg;C`;
    document.querySelector('#minCurrent').innerHTML = `${data.daily[0].temp.min.toFixed(1)}&deg;C`;
}

// atualiza a previsao por hora do local
function climateHour (dataHourly) {
    // const list = document.querySelector('#previousHour');

    for (const hour of dataHourly) {
        const date = new Date(hour.dt*1000);

        const cardHour = createCardHour({
            hour: date.toLocaleTimeString().slice(0,5),
            img: `../img/${hour.weather[0].icon}.png`,
            temp: `${hour.temp.toFixed(1)}&deg;C`,
        });

        listHour.append(cardHour);
    }
}

// cria o card po horario
function createCardHour (content) {
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

// atualiza as previsoes diarias
function climateDay (dataDaily) {
    const mouths = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    for (const day of dataDaily) {
        const date = new Date(day.dt*1000);

        const cardDay = createCardDay({
            dateFormated: `${date.getDate()} ${mouths[date.getMonth()]}`,
            img: `../img/${day.weather[0].icon}.png`,
            min: `${day.temp.min.toFixed(1)}&deg;C`,
            max: `${day.temp.max.toFixed(1)}&deg;C`,
            desc: day.weather[0].description
        });

        listDay.append(cardDay);
    }
}

// cria o card com a informacao de cada dia cada dia
function createCardDay (dataDay) {
    const li = document.createElement('li');
    const date = document.createElement('h5');
    const container = document.createElement('div');
    const img = document.createElement('img');
    const minMax = document.createElement('div');
    const min = document.createElement('p');
    const max = document.createElement('p');
    const desc = document.createElement('p');

    li.setAttribute('class', 'd-flex align-items-center flex-column mx-2 px-0 py-1 rounded');
    container.classList.add('d-flex');
    img.setAttribute('src', dataDay.img);
    minMax.id = 'minMax';
    minMax.setAttribute('class', 'px-3 pt-1 mt-3');
    min.classList.add('fs-6');
    max.classList.add('fs-6');
    desc.classList.add('fs-5');

    date.innerHTML = dataDay.dateFormated;
    min.innerHTML = dataDay.min;
    max.innerHTML = dataDay.max;
    max.innerHTML = dataDay.max;
    desc.innerHTML = dataDay.desc;

    minMax.append(max);
    minMax.append(min);
    container.append(img);
    container.append(minMax);
    li.append(date);
    li.append(container);
    li.append(desc);

    return li;
}