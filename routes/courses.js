const express = require('express');
const router = express.Router();
const Controller = require('../controllers/courses');

// GET /course
// POST /course
router.route('/')
    .get(Controller.getCourses)
    .post(Controller.addCourse);

// GET /course/:id
// PATCH /course/:id
// DELETE /course/:id
router.route('/:id')
    .get(Controller.getCourseById)
    .patch(Controller.updateCourse)
    .delete(Controller.deleteCourse)

module.exports = router;