// Requiring path to so we can use relative routes to our HTML files
const express = require('express');
const router = express.Router();
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
        res.redirect('/members');
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
        res.redirect('/members');
    }
    res.render('signup');
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get('/members', isAuthenticated, (req, res) => {
    const userData = {
        name: req.user.name,
        email: req.user.email,
        createdAt: req.user.createdAt,
        id: req.user.id,
    };
    res.render('members', userData);
});

module.exports = router;
