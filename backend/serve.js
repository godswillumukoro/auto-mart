const path = require('path');
const express = require('express');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
// setting up middleware in order to use req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// importing routes
app.use('/api/cars', require('./routes/carRoute'));
app.use('/api/users', require('./routes/userRoute'));

// serve frontend
if (process.env.NODE_ENV === 'production') {
  // static folder
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  //   route
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port:${port}`));
