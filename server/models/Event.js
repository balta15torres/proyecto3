const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
    location:String,
    data:Number,
    hour:Number,
    participants:Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event