const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationElement = document.querySelector('[data-location')
const statusElement = document.querySelector('[data-status')
const tempElement = document.querySelector('[data-temp')
const windElement = document.querySelector('[data-wind')
const humidityElement = document.querySelector('[data-humidity')

const icon = new Skycons({color:'#222'})
icon.set('icon','clear-day')
icon.play()

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = search.value
    fetch(`/weather?address=${address}`).then((response) =>{
    response.json().then((result) =>{
        if(result.error){
            
            locationElement.textContent= result.error
            statusElement.textContent = 'Error'
            icon.set('icon','clear-day')
            icon.play()
        }else{
            locationElement.textContent = result.location
            statusElement.textContent = result.data.status
            tempElement.textContent = '' +result.data.temperature +' \u00B0C'
            windElement.textContent = result.data.wind +"Km/h"
            humidityElement.textContent = result.data.humidity + " %"
            icon.set('icon',check(result.data.status))
            icon.play()
            
        }
        
    })
})
})

function setIcon(weatherStatus){
   
}
function check(weatherStatus){

    const fog1 = ['fog', 'haze', 'mist', 'smog', 'foggy', 'hazy', 'misty', 'smoggy', 'dew', 'dewy',

        'thick fog','dense fog','heavy fog', 'patchy fog' ]
    const fog = fog1.some(e1 => weatherStatus.toLowerCase().includes(e1))

    const snow1 = ['heavy snow', 'deep snow', 'fresh snow', 'light snow', 'wet snow', 'falling snow', 'melting snow',

        'snow', 'snowfall','sleet', 'snowstorm', 'blizzard', 'frost',' thaw',' slippery roads',
        
        'snowflake', 'snowdrift', 'snowbank', 'ice', 'icicle']
    const snow = snow1.some(e1 => weatherStatus.toLowerCase().includes(e1))

    const wind1 = ['wind', 'breeze', 'strong wind', 'high wind', 'light wind',

        'cool wind', 'warm wind','fresh wind', 'cold wind','thunderstorm',
        
        'hurricane', 'windstorm', 'whirlwind', 'tornado', 'typhoon', 'gale', 'dust storm', 'sandstorm', 'tropical storm']
    const wind = wind1.some(e1 => weatherStatus.toLowerCase().includes(e1))

    const rain1 =['rain', 'heavy rain', 'pouring rain', 'steady rain', 'constant rain', 'cold rain', 'warm rain', 'light rain', 'gentle rain',

        'rain', 'rainfall', 'rain shower', 'downpour', 'deluge', 'rainstorm', 'drizzle']
    const rain = rain1.some(e1 => weatherStatus.toLowerCase().includes(e1))

    const sunny = ['clear','sunny']
    const clear = sunny.some(e1 => weatherStatus.toLowerCase().includes(e1))

    const cloud = ['partly cloudy','overcast','cloudy']
    const cloudy = cloud.some(e1 => weatherStatus.toLowerCase().includes(e1))
    if(fog)
        return 'fog'
    else if(snow)
        return 'snow'
    else if(wind)
        return 'wind'
    else if(rain)
        return 'rain'
    else if(cloudy)
        return 'partly-cloudy-day'
    else if(clear)
        return 'clear-day'
    else
        return 'clear-day'


    
}