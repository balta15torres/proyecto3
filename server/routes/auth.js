const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event")
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
      if (err) {
          res.status(500).json({ message: 'Something went wrong authenticating user' });
          return;
      }
  
      if (!theUser) {
          // "failureDetails" contains the error messages
          // from our logic in "LocalStrategy" { message: '...' }.
          res.status(401).json(failureDetails);
          return;
      }

      // save user in session
      req.login(theUser, (err) => {
          if (err) {
              res.status(500).json({ message: 'Session save went bad.' });
              return;
          }

          // We are now logged in (that's why we can also send req.user)
          res.status(200).json(theUser);
      });
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const imageUrl = req.body.imageUrl
  if (username === "" || password === "") {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: 'Username taken. Choose another one.' });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPass,
      imageUrl
    });

    newUser.save()
    .then(() => {
      res.status(200).json(newUser);
    })
    .catch(err => {
      res.status(400).json({ message: 'Saving user to database went wrong.' });
    })
  });
});



router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

router.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

router.get("/getDataUser",(req,res,next) =>{
  

  console.log(req.user)
  res.status(200).json(req.user);
})

router.post('/getDataE',(req,res,next) => {
  console.log(req.body)
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
    res.status(400).json({ message: 'Saving user to database went wrong.' });
  })

  // Event.save({
  //   description,
  //   data,
  //   hour,
  //   participants
  // })
  // .then( res => 

  //   res.status(200).json(req.event)

  // )
})

module.exports = router
