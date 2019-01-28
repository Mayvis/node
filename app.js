const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug'); // choose pug engine
app.set('views', 'views'); // choose html folder

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extends: false}));
app.use(express.static(path.join(__dirname, 'public'))); // css file to be static

app.use('/admin', adminData.routes); // Only route which begin with /admin will trigger adminRoutes.
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});

    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3001);
