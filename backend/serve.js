const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();

const port = process.env.PORT || 5000;

const app = express();
// setting up middleware in order to use req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// importing routes
app.use('/api/cars', require('./routes/carRoute'));
app.use('/api/users', require('./routes/userRoute'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port:${port}`));
