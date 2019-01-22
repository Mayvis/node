const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extends: false}));
app.use(express.static(path.join(__dirname, 'public'))); // css file to be static

app.use('/admin', adminRoutes); // Only route which begin with /admin will trigger adminRoutes.
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
