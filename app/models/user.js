const mongoose = require('mongoose')
schema = mongoose.Schema;

let userSchema = new schema({

    userId :{
        type : 'String',
        default :'',
       
    },
    firstName :{
        type :'String',
        default: ''
    },
    lastName :{
        type :'String',
        default: ''
    },
    email :{
        type : 'string',
        default: '',
        unique : true,
        index: true
    }, 

    password :{
        type : 'string',
        default: ''
    }



})


mongoose.model ('user' , userSchema)