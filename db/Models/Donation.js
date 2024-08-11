const { Schema, model} = require('mongoose')


const donationSchema = new Schema({
    donorId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
    },
    donationCategory: {
        type: String,
        required: true
    },
    quantity:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    condition:{
        type: String,
    },
    imageUrl: {
        type: String,
    },
    pickUpAddress:{
        type:String,
        required: true
    },
    deliveryAddress:{
        type:String,
    },
    status:{
        type:String,
        default: "available"
    },
    available:{
        type: Boolean,
        default: true
    }
},{
    timestamps:true
})

const Donation = model('donation',donationSchema);

module.exports = Donation;
