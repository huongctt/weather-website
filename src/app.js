const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')
// console.log(__dirname)   //folder
// console.log(__filename)    //file

const app = express()
//heroku
const port = process.env.PORT ||3000

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// console.log(path.join(__dirname, '../public'))

//Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'H'
    })
})

app.get('/about', (req,res) =>{  
    res.render('about', {
        title:'About',
        name: 'Hb'
    })
})
app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'No address'
        })
    }
    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longtitude , (error, forecastData) => {
            if (error) {
                return res.send ({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/help', (req,res) =>{
    res.render('help', {
        title:'Help',
        helpText:'This is help text',
        name: 'Hb'
    })
})

app.get('/help/*',(req, res) => {
    res.render('404', {
        title:'Help',
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title:'Page',
    })
})

// app.com
// app.com/about


// app.listen(3000, () => {
//     console.log('Server is up on port 3000')
// })

//HEROKU
app.listen(port, () => {
    console.log('Server is up on port ' +port)
})