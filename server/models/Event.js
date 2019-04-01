const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
    location:String,
    data:String,
    hour:String,
    participants:Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event