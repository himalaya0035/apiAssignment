const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name : {
        type : String,
        required:true
    },
    age : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    birthday :{
        type : Date,
        required : true
    },
    gender : {
        type : String,
    },
    contactno : {
        type : Number,
        required : true,
        unique : true
    },
    city : {
        type : String
    },
    state : {
        type : String
    },
    country : {
        type : String
    },
    address1 : {
        type : String
    },
    address2 : {
        type : String
    }
},{timestamps:true})


userSchema.path('contactno').validate((contactno) => {
    return contactno.toString().length === 10;
},'The contact should have length of 10')

userSchema.path('age').validate((age) => {
    return age > 18;
},'The age should be greater than 18')


module.exports = mongoose.model('User',userSchema);