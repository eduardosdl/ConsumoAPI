// const URL = 'https://api.hgbrasil.com/weather?key=4cda53da&city_name=Paulista,PE'
// const city = 'Recife,PE'
// const URLCity = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=8f77d0065bcd16d453b9e3093004900c#`;
// const URLclima = 'https://api.openweathermap.org/data/2.5/onecall?lat=-7.950487&lon=-34.874409&exclude=hourly,minutely&units=metric&lang=pt_br&appid=8f77d0065bcd16d453b9e3093004900c#';


/* fetch(URL).then((res) => {
    return res.json()
}).then((teste) => console.log(teste)).catch((err) => {
    console.log(err);
})

fetch(URLcity).then((res) => {
    return res.json()
}).then((teste) => console.log(teste)).catch((err) => {
    console.log(err);
}) */


const teste = async function() {
    const city = 'Recife'
    const URLCity = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=8f77d0065bcd16d453b9e3093004900c#`;
    const cidade = await fetch(URLCity);
    const dataCity = await cidade.json();
    console.log(dataCity)
    const latCity = dataCity[0].lat
    const lonCity = dataCity[0].lon

    const URLClima = `https://api.openweathermap.org/data/2.5/onecall?lat=${latCity}&lon=${lonCity}&exclude=hourly,minutely&units=metric&lang=pt_br&appid=8f77d0065bcd16d453b9e3093004900c#`;

    const clima = await fetch(URLClima)
    const dataClima = await clima.json();



    console.log(dataClima);


    let dataUnix = 1658412000
    let data = new Date(dataUnix*1000);
    console.log(data)

    

}

teste();