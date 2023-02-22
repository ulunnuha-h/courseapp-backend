const express = require('express')
const router = express.Router();
const Controller = require('../../controllers/user-courses');
const authenticateToken = require('../../middlewares/authenticate')

router.use(authenticateToken);

// GET /users/:id/courses
// POST /users/:id/courses
// DELETE /users/:id/courses
router.route('/:id/course')
    .get(Controller.getCoursesFromUserId)
    .post(Controller.addCourseToUser)
    .delete(Controller.deleteCourseFromUser)



module.exports = router;
