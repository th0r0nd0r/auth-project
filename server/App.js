import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema/schema';
import mongoose from 'mongoose';
import authRoutes from './routes/auth-routes';
import path from 'path';
import keys from './config/keys';

const app = express();

// connect to database
// NOTE: the connection string should at the very least be an environment variable, oustide the application code.
// I'm just exposing it here for the purpose of easily sharing access to the coding challenge.
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

app.listen(4000, () => {
  console.log("Now listening on port 4000");
});