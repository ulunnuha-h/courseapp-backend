const express = require('express')
const router = express.Router();
const Controller = require('../../controllers/users');

// GET /users
// POST /users
router.route('/')
    .get(Controller.getUsers)
    .post(Controller.addUser)

// GET /users/:id
// PATCH /users/:id
// DELETE /users/:id
router.route('/:id')
    .get(Controller.getUserById)
    .patch(Controller.updateUser)
    .delete(Controller.deleteUser)

module.exports = router;
