if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors'); // Corrected path
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Could not connect to MongoDB:', error));

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/', authRoutes);
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});