const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const centersSchema = new Schema({
    idSchema : String,
    title: String, 
    distrito:String,
   location: {
       latitude: Number, 
       longitude: Number 
    },
   organization :{
       schedule:String,
       services:String
    }
       }, 
       {
       timestamps: true
       })

       centersSchema.index({location: '2dsphere'})
       
const Centers = mongoose.model('Centro', centersSchema)
module.exports = Centers