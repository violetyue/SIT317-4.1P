const mongoose = require("mongoose")
const validator = require("validator")
const customerSchema = new mongoose.Schema(
    {
        country : {type: String, required: true},
        fname: {type: String, required: true},
        lname: {type: String, required: true},
        email: {
            type: String,
            required: true,
            validate(value){
                if (!validator.isEmail(value)){
                    throw new Error('Email is not valid!')
                }
            }
        },
        password : {
            type: String,
            required: true,
            minLength: [8, 'Password must be at least 8 characters'],
        },
        cpassword : {
            type: String,
            required: true,
            validate: {
                validator: function(el) 
                {
                    return el === this.password
                }, 
                message: 'Password does not match.'
            }
        },
        address1 : {type: String, required: true},
        address2 : {type: String},
        city : {type: String, required: true},
        state : {type: String, required: true},
        zip : {type: String},
        mobile : {type: String}
    }
)

module.exports = mongoose.model("Customer", customerSchema)