const User = require('../models/users');
const Course = require('../models/courses');

const addCourseToUser = async (req, res) => {
    const {id : userId} = req.params;
    const {id : courseId} = req.body;

    try {
        const course = await Course.findById(courseId);
        const user = await User.findById(userId);
        if(user.courses.includes(courseId)) {
            return res.status(400).json({message : 'Course has been added'})
        }
        course.users.push(userId);
        await course.save();
        user.courses.push(courseId);
        const updatedUser = await user.save();

        return res.json(updatedUser);
    } catch (error) {
        return res.json({message : error.message})
    }
}

const deleteCourseFromUser = async (req, res) => {
    const {id : userId} = req.params;
    const {id : courseId} = req.body;
    try {
        const course = await Course.findById(courseId);
        const user = await User.findById(userId);
        course.users = course.users.filter(val => val != userId);
        await course.save();
        user.courses = user.courses.filter(val => val != courseId);
        const updatedUser = await user.save();

        return res.json(updatedUser);
    } catch (error) {
        return res.json({message : error.message})
    }
}

const getCoursesFromUserId = async (req, res) => {
    const {id : userId} = req.params;
    try {
        const user = await User.findById(userId).populate('courses');
        if(user.courses == null){
            res.status(404).json({message : 'No courses'});
        }

        res.json(user.courses);
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}

module.exports = {
    addCourseToUser,
    deleteCourseFromUser,
    getCoursesFromUserId
}