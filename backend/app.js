require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const cors = require('cors');

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static('../frontend/dist'));

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/api', routes);

mongoose.connect(process.env.DB_CONNECTION).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
