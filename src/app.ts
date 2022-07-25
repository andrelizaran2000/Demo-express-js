// Modules
import express from 'express';
import mongooseConnection from './helpers/mongooseConnection';

// Routes
import loginRouter from './routes/login';

const app = express();

const PORT = 4000;

mongooseConnection();

app.use(express.json());

app.use('/login', loginRouter);

app.listen(PORT, () => {
  console.log(`Listening in ${PORT} port`)
})