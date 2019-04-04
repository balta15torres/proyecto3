const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
    
    location:String,
    center:String,
    data:String,
    hour:String,
    participants:Number,
    comments:String,
    idParticipants: [{type: Schema.Types.ObjectId, ref: "User"}],
    email:String,
    tlf:Number

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
  
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event