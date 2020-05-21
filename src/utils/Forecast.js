const request = require('request')

const getForecast = (latitude,longitude,callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=b8f96a869fc45f2731ada3e249c32ab1&query=${latitude},${longitude}`

    request({url:url, json:true},(error,result) =>{
        if(error){
            callback('Unable to connect to the weather service!',undefined)
        }else if(result.body.error){
            callback('please provide a valid location!',undefined)
        }
        else{
            const data = `Current weather is ${result.body.current.weather_descriptions[0]}

            Current temperature is ${result.body.current.temperature} degree celsius and it feels like ${result.body.current.feelslike} degree celsius
            
            Humidity is ${result.body.current.humidity}% 
            
            wind speed is ${result.body.current.wind_speed}km/hr`

            callback(undefined,data)
        }
    })
}


module.exports = getForecast