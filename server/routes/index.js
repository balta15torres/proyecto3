const express = require('express');
const router  = express.Router();
const Event = require("../models/Event")
const Centers = require("../models/Centers");
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.get("/getDataUser",(req,res,next) =>{
  

  console.log(req.user)
  res.status(200).json(req.user);
})

router.post('/getDataE',(req,res,next) => {
  const location = req.body.location
  const data = req.body.data
  const hour = req.body.hour
  const participants = req.body.participants
  
  const newEvent = new Event({
    location,
    data,
    hour,
    participants
  });
  

  newEvent.save()
  .then(() => {
    res.status(200).json(newEvent);
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


router.get('/getAllCenters', (req, res) => {
  Centers.find()
  .then(centers => {
    console.log(centers)
    res.json(centers)
  })
});

module.exports = router;
