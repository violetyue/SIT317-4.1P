const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const mongoose = require("mongoose")
const validator = require("validator")
const Customer = require("./models/Customer")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

mongoose.connect("mongodb+srv://admin-minyue:kitty123@cluster0.pwpra.mongodb.net/iServiceDB?retryWrites=true&w=majority", {useNewUrlParser: true})

app.post('/', (req,res)=>{
    const country = req.body.inputCountry
    const firstname = req.body.inputFirstname
    const lastname = req.body.inputLastname
    const email = req.body.inputEmail
    const password = req.body.inputPassword
    const cpassword = req.body.confirmPassword
    const address1 = req.body.inputAddress1
    const address2 = req.body.inputAddress2
    const city = req.body.inputCity
    const state = req.body.inputState
    const zip = req.body.inputZip
    const mobile = req.body.inputMobile

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    }
    jsonData = JSON.stringify(data)

    const apiKey = "3eaad097784a1f1d6be2074ba1aa7d15-us6"
    const url="https://us6.api.mailchimp.com/3.0/lists/f45f17db83"
    const options={
        method:"POST",
        auth:"azi:3eaad097784a1f1d6be2074ba1aa7d15-us6"
    }

    const request = https.request(url, options, (response)=>{
        response.on("data", (data)=> {
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()

    const customer = new Customer({
        country : country,
        fname : firstname,
        lname : lastname,
        email : email,
        password : password,
        cpassword : cpassword,
        address1 : address1,
        address2 : address2,
        city : city,
        state : state,
        zip : zip,
        mobile : mobile
    })
    customer
    .save()
    
    .catch((err) => res.status(200).send(err.message));

    
    if (res.statusCode === 200)
    {
        res.sendFile(__dirname + "/success.html")
    }
    else{
        res.sendFile(__dirname + "/404.html")
    }
})

let port = process.env.PORT;
if (port == null || port == "")
{
    port = 5000;
}

app.listen(port, (req,res)=>{
    console.log("Server is running successfullly!")
})