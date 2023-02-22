const express = require('express');
const router = express.Router();
const Controller = require('../controllers/admin')

// POST /admin/login
// POST /admin/register
router.post('/register',Controller.register);
router.post('/login',Controller.login);

module.exports = router;