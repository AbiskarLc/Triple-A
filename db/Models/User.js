const {model, Schema} = require('mongoose');


const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    email:{
     type: String,
     required: true,
     unique: true
    },
    password:{
        type:String,
        required: true
    },
    usertype:{
        type:String,
        required: true
    },
    organization:{
        type: String
    },
    isAdmin:{
        type: Boolean,
       default:false
    },
    profilePicture:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
    
},{timestamps:true});


const User = model('user',userSchema);

module.exports = User;