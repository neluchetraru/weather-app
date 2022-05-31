const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ab823ae8aac319da11766049365029c3&query=' + latitude + ',' + longitude
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' degrees outside, but it feels like ' + body.current.feelslike + '.')
        }
    })

}

module.exports = forecast