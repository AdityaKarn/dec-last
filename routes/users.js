const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const json = require("../public/data/taskData.json");

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBBKAvRTprpw77X757-MlTnUcgcOcczqJ8",
  authDomain: "dec-20-f170d.firebaseapp.com",
  databaseURL: "https://dec-20-f170d.firebaseio.com",
  projectId: "dec-20-f170d",
  storageBucket: "dec-20-f170d.appspot.com",
  messagingSenderId: "257048932732",
  appId: "1:257048932732:web:377b9eb0eed47a479c34f9",
  measurementId: "G-8WRPXY9DVK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// HomeBoard
router.get('/homeboard', function (req, res) {
  var user = firebase.auth().currentUser;
  if (user != null) {
    res.render('home', { user: user });
  }
  else {
    req.flash('error_msg', 'Please log in to view that resource!');
    res.redirect('/users/login')
    console.log('error-User Not Logged IN')
  }
})

// ======================Dashboard==============================
/*
router.get('/dashboard', function (req, res) {
  var user = firebase.auth().currentUser;
  if (user != null) {
    var userID = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userID).once("value", (snap) => {
      const data = snap.val();
      if (!data) {
        req.flash('error_msg', 'NO DATA');
        res.redirect('/users/login')
      }
      var email = data.email;
      var name = data.name;
      var number = data.number;
      var college = data.college;
      var teamname = data.team_name;
      var address = data.address;
      var score = data.score;
      res.render('dash', {
        email,
        name,
        number,
        college,
        teamname,
        address,
        score
      });
    })

  }
  else {
    req.flash('error_msg', 'Please log in to view that resource!');
    res.redirect('/users/login')
    console.log('error-User Not Logged IN')
  }
});
*/
// ==================================================================



// ==================== Render Task Page:===============================
router.get("/dashboard/tasks/:num", function (req, res, next) {
  var user = firebase.auth().currentUser;
  if (user != null) {
    let taskNum = Number(req.params.num);
    if (Number.isInteger(taskNum) && taskNum >= 1 && taskNum <= 10) {
      res.render("task_page", json[taskNum - 1]);
    } else {
      res.render("not_found");
    }
  } else {
    req.flash("error_msg", "Please log in to view that resource!");
    res.redirect("/users/login");
    console.log("error-User Not Logged IN");
  }
});
// ===================================================================



// Login Page
router.get('/login', (req, res) => res.render('login'));


// ============= Login and Registration =====================


router.post('/login', (req, res, next) => {
  var UserMail = req.body.email;
  var UserPass = req.body.password;
  firebase.auth().signInWithEmailAndPassword(UserMail, UserPass)
    .then(function (data) {
      res.redirect('/users/homeboard')
    })
    .catch(function (error) {
      let errorMessage = error.MESSAGE;
      req.flash('error_msg', 'Incorrect Email or Password!!');
      console.log(errorMessage)
      res.redirect('/users/login');
    })

});

// =========== Uncomment To Register=========================


router.get('/register', (req, res) => res.render('register'));

router.post('/register', (req, res) => {
  var UserName = req.body.name;
  var UserCollege = req.body.college;
  var address = req.body.address;
  var team_name = req.body.team_name;
  var Phone = req.body.number;
  var email = req.body.email;
  var password = req.body.password;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (data) {
      var user = firebase.auth().currentUser;
      logUser(user.uid, UserName, UserCollege, Phone, team_name, email, address);
      req.flash(
        'success_msg',
        'You are now registered and can log in'
      );
      res.redirect('/users/login');
    })
    .catch(function (error) {
      var errorMessage = error.message;
      req.flash('error_msg', 'Email Already Taken!');
      res.redirect('/users/login')
    })

});

function logUser(userID, name, college, number, team_name, email, address) {
  let newData = firebase.database().ref('users/' + userID)
  newData.set({
    name: name,
    college: college,
    number: number,
    team_name: team_name,
    email: email,
    address: address
  });

}



// ======================= Edit Profile====================================

router.get('/editprofile', function (req, res) {
  var user = firebase.auth().currentUser;
  if (user != null) {
    res.render('profileEdit');
  }
  else {
    req.flash('error_msg', 'Please log in to view that resource!');
    res.redirect('/users/login')
    console.log('error-User Not Logged IN')
  }
});


router.post('/editprofile', (req, res) => {
  var user = firebase.auth().currentUser;
  if (user != null) {
    var userID = firebase.auth().currentUser.uid;
    let newData = firebase.database().ref('users/' + userID)
    newData.update({
      name: req.body.name,
      team_name: req.body.teamname,
      number: req.body.number,
      address: req.body.address
    });
    req.flash('success_msg', 'Details Updated Successfully!!!');
    res.redirect('/users/dashboard');
  }
  else {
    req.flash('error_msg', 'Please log in to view that resource!');
    res.redirect('/users/login')
    console.log('error-User Not Logged IN')
  }
})

// =================== Password Reset===============================

router.get('/forgotpassword', (req, res) => {
  res.render('passRest');
})

router.post('/forgotpassword', (req, res) => {
  var email = req.body.email;
  firebase.auth().sendPasswordResetEmail(email)
    .then(function () {
      req.flash('success_msg', 'Email Has been sent to your mail!!!');
      res.redirect('/users/login');
    })
    .catch(function (error) {
      // Handle Errors here.
      let errorMessage = error.MESSAGE;
      req.flash('error_msg', 'Email not registered!');
      res.redirect('/users/forgotpassword');
    })
})

// ==================================================================


// Logout
router.get('/logout', function (req, res) {
  firebase.auth().signOut()
    .then(function () {
      req.flash('success_msg', 'You are logged out!');
      res.redirect('/users/login');
    })
    .catch((error)=>{
      res.redirect('/users/login');
    })
});

module.exports = router;