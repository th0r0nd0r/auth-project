import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema/schema';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import keys from './config/keys';

const app = express();

// use environment variable in production
const PORT = process.env.PORT || 5000;

// connect to database
mongoose.connect(keys.mongoString, {useNewUrlParser: true});

mongoose.connection.once('open', () => {
  console.log('the goose is in the burrow');
});

app.use('/', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.use('/auth', authRoutes);

// would use if React project was served by the backend (e.g. if it was rooted in an ejs file)
// app.get('*', (req, res) => {                       
//   res.sendFile('../client/index.html');                               
// });

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});