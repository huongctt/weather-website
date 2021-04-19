const request = require("request")

const forecast = (latitude, longtitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=a1503973229ee109362d164bf344194c&query='+longtitude+',' +latitude 
    request({url: url, json: true}, (error, {body}) =>{
        if (error){
            callback('Unable to connect', undefined)
        } else if (body.error){
            callback('Unable to find', undefined)
        } else {
            callback(undefined, 'The temperature is ' + body.current.temperature + '.The humidity is' + body.current.humidity)
        }
    })
}


module.exports = forecast