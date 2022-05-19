const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');

// connects to MongoDB
connectDB();

const port = process.env.PORT || 5000;
// imports routers
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
// overrides the default error handler coming from express.js
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port:${port}`));
