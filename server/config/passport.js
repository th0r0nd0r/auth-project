import { Strategy, ExtractJwt } from 'passport-jwt';

// in a real app, would use something like:
// const secretOrKey = process.env.SECRET
import { secretOrKey } from './keys';
import mongoose from 'mongoose';
const User = mongoose.model("User");
const options = {
  secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

export default passport => {
  passport.use(
    new Strategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};