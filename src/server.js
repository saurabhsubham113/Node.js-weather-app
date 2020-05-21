const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/Forecast')

const app = express()

const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')

//seeting view engine
app.set('view engine','hbs')    //for setting the engine
app.set('views',viewsPath)      //for setting the custom folder other than views

/*partials are something that can be used to render something that can be used in every 
rendered file 
{{>filename}} this can be used to get the content value
*/
hbs.registerPartials(partialPath)   //registering partials 

//serving static file 
app.use(express.static(publicDirectory))

//http route
app.get('', (req,res) =>{
    res.render('index',{
        title:'Weather app',
        name:'subham saurabh'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title:'About section',
        name:'subham saurabh'
    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        title:'help section',
        name:'subham saurabh'
    })
})



app.get('/weather' , (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'please provide an address'
        })
    }

    geocode(address,(error,geodata) => {
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(geodata.latitude, geodata.longitude, (error, forecastdata) => {
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                location:geodata.location,
                data:forecastdata
            })
        })
    })

})

app.listen(3000,()=>{
    console.log('server started on port 3000')
})