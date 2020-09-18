const express = require('express');

const error = require('../middleware/error');

const genres = require('../route/genres');
const home = require('../route/home');
const customers = require('../route/customers');
const movies = require('../route/movies');
const rentals = require('../route/rentals');
const users = require('../route/users');
const auth = require('../route/auth');
const returns = require('../route/returns');


module.exports = function(app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/returns', returns);
    app.use(error);
}