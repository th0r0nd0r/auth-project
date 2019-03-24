import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import keys from '../config/keys';
import validateLogin from '../validation/login';
import validateSignup from '../validation/signup';
import User from '../models/User';

// standard auth route
router.get('/login', (req, res) => {
  // standard login
});

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  const { errors, isValid } = validateSignup(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email}).then(user => {
    if (user) {
      return res.status(400).json({email: "Email already exists"});
    }
  });

  const newUser = new User({name, email, password});

  // salt + hash password before saving
  bcrypt.genSalt(10, (saltErr, salt) => {
    bcrypt.hash(newUser.password, salt, (hashErr, hash) => {
      if (hashErr) {throw hashErr;}
      newUser.password = hash;
      newUser.save().then(user => res.json(user).catch(err => console.log(err)));
    });
  });
});

router.get('/logout', (req, res) => {
  // log out users
});


router.get('/linkedin', (req, res) => {
  // handle request for linkedin
});

export default router;