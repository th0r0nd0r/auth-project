import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema/schema';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import keys from './config/keys';
import passport from 'passport';
import passportConfig from './config/passport';

const app = express();

// use environment variable in production
const PORT = process.env.PORT || 4000;

// connect to database
mongoose.connect(keys.mongoString, {useNewUrlParser: true});

mongoose.connection.once('open', () => {
  console.log('the goose is in the burrow');
});

// initialize + configure passport with jwt Strategy
app.use(passport.initialize());
passportConfig(passport);

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});