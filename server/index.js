import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import * as dotenv from 'dotenv';
import schema from './schema/schema.js';
import connectDB from './config/db.js';

dotenv.config();

const root = {
  hello: () => {
    return 'Hello world!';
  },
};

const port = process.env.PORT || 4000;
const app = express();

connectDB();

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: process.env.NODE_ENV === 'dev',
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
