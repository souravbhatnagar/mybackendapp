const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const route = require('./routes')
const hikeRoutes = require('./routes/hikeRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', route.index);
app.use('/hikes', hikeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

module.exports = app;
