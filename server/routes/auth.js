import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import keys from '../config/keys';
const secretOrKey = keys.secretOrKey;
import validateLogin from '../validation/login';
import validateSignup from '../validation/signup';
import User from '../models/User';

// standard auth route
router.get('/login', (req, res) => {
  // standard login
});

router.post('/signup', (req, res) => {
  console.log("request body: ", req.body);
  const { name, email, password } = req.body;

  // validate user info
  const { errors, isValid } = validateSignup(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // ensure sure user is new
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

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  // validate user info
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    // ensure user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {

      // validate hashed password
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };

        // sign jwt
        jwt.sign(
          payload,
          secretOrKey,
          {
            expiresIn: 300 // 5 minutes (in seconds)
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// token patterns from https://github.com/rishipr/mern-auth/tree/master/routes/api

router.get('/logout', (req, res) => {
  // log out users
});


router.get('/linkedin', (req, res) => {
  // handle request for linkedin
});

export default router;