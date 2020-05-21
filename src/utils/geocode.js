const request = require('request')

const getGeoCode = (address,callback)=>{
    const geoCode = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2F1cmFiaHN1YmhhbTExIiwiYSI6ImNrYWYwczl4bjBhb3IydG12OGh5d2x4OGUifQ.lgfBlR1SejQYOZiJFMtGYQ&limit=1`

    request({url:geoCode, json:true},(error,result) =>{
            if(error){
                callback('Unable to conect to the location service!'+error,undefined)
            }else if(result.body.features.length === 0){
                callback('unable to find location!, Try another search',undefined)
            }else{
                const data = {
                    latitude : result.body.features[0].center[1],
                    longitude : result.body.features[0].center[0],
                    location : result.body.features[0].place_name
                }
                callback(undefined,data)                
            }
    })
}

module.exports = getGeoCode