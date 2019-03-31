const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const centroSchema = new Schema({
    idSchema : String,
    title: String, 
   location: {
        type: { type: String },
        coordinates: []
       }}, 
       {
       timestamps: true
       })

const Centro = mongoose.model('Centro', centroSchema)
module.exports = Centro