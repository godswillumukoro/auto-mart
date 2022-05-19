const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');

const port = process.env.PORT || 5000;

const app = express();
// setting up middleware in order to use req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/cars', require('./routes/carRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port:${port}`));
