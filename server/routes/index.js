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
  res.status(200).json(req.user)
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

router.post('/getCenters',(req,res) => {
  const distrito = req.body.distrito
  Centers.find({distrito})
  .then(data => res.json(data))
  .catch(err => console.log(err))

})

module.exports = router;
