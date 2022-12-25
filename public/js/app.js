
const weatherFormSearchButton = document.querySelector('.button-search')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherFormGeolocate = document.querySelector('.button-geolocate')
const weatherForm = document.querySelector('form')
const weatherFormSearchInput = document.querySelector('form input')

weatherFormSearchButton.addEventListener('click', (e) => {
    e.preventDefault()
    const location = search.value
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

weatherFormGeolocate.addEventListener('click',(e) => {
    e.preventDefault()
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    navigator.geolocation.getCurrentPosition((position) => {
        fetch(`/weather?address=${position.coords.longitude},${position.coords.latitude}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    })

})

weatherFormSearchButton.disabled = true
weatherForm.addEventListener('keyup',() => {
    if(weatherFormSearchInput.value === ''){
        weatherFormSearchButton.disabled = true 
    } else {
        weatherFormSearchButton.disabled = false
    }
})