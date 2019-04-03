const express = require('express');
const router  = express.Router();
const Event = require("../models/Event")
const Centers = require("../models/Centers")
const uploadCloud = require("../configs/cloudinary")
const User = require("../models/User")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.get("/getDataUser",(req,res,next) =>{
  

  console.log("eoooo")
  res.status(200).json(req.user)
})

router.post('/getEditUser',uploadCloud.single('photo'),(req,res,next)=>{
  

  const imageUrl = req.file.secure_url
  const username = req.body.username
  const email = req.body.email
  console.log(req.body)
  if (username === "" || email === "") {
    res.status(400).json({ message: 'Provide username and password' })
    return;
}
  User.findByIdAndUpdate(req.user._id, {imageUrl, username, email}, {new:true})
  .then(user =>{
    res.status(200).json(user)
  })
  .catch(err => 
    res.json(err))
})


router.post('/getDataE',(req,res,next) => {

  console.log(req.body)

  const {location,center, data, hour, participants, comments} = req.body
  
  const newEvent = new Event({
    location,
    center,
    data,
    hour,
    participants,
    comments
  });
  

  newEvent.save()
  .then((event) => {
    console.log(event)
    Centers.findOneAndUpdate({title:center}, {$push:{events:event._id}}, {new:true}).then((e) => {
      console.log(e)
      res.status(200).json(newEvent);
    }) 
  })
  .catch(err => {
    console.log(err)
    res.status(400).json({ message: 'Saving user to database went wrong.' });
  })
})

router.get('/getOneEvent/:id', (req,res)=> { Event.findById(req.params.id)
  .then(data => res.json(data))
  .catch(err => console.log(err))

})

router.get('/getAllEvents', (req,res,next) => {
  Event.find()
  .then(data => res.json(data))
  .catch(err => console.log(err))
})

router.get('/removeEvent/:id',(req,res) => {
  Event.findByIdAndDelete(req.params.id)
  .then(data => res.json(data))
  .catch(err => console.log(err))
})


router.get('/getAllCenters', (req, res) => {
  Centers.find()
  .populate("events")
  .then(centers => {
    console.log(centers)
    res.json(centers)
  })
});
/////////////////////////////////////////////
router.post('/getCenters',(req,res) => {
  const distrito = req.body.distrito
  Centers.find({distrito})
  .then(data => res.json(data))
  .catch(err => console.log(err))

})





module.exports = router;
