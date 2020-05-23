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
            const data = {
            status:result.body.current.weather_descriptions[0],
            temperature:result.body.current.temperature,
            humidity:result.body.current.humidity,
            wind : result.body.current.wind_speed
        }

            callback(undefined,data)
        }
    })
}


module.exports = getForecast