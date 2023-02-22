const Model = require('../models/courses');

const getCourses = async (req, res) =>{
    try {
        const courses = await Model.find().populate('category');
        if(courses == null){
            return res.status(404).json({message: 'Courses not found'});
        }

        return res.json(courses);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

const getCourseById = async (req, res) => {
    try {
        const {id} = req.params;
        const course = await Model.findById(id);
        if(course == null){
            return json.status(404).json({message : 'Course not found'});
        }
        return res.json(course);
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}

const addCourse = async (req, res) => {
    const {title, category} = req.body;
    const course = new Model({
        title,
        category
    })

    try {
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({message : error.message});
    }
}

const updateCourse = async (req, res) => {
    const {id} = req.params;
    const {title, category} = req.body;
    try {
        const course = await Model.findById(id);
        if(title != null) course.title = title;
        if(category != null) course.category = category;
        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

const deleteCourse = async (req, res) => {
    const {id} = req.params;
    try {
        const course = await Model.findById(id);
        await course.remove();

        res.json({message : "Course deleted successfully"});
    } catch (error) {
        
    }
}

module.exports = {
    getCourses,
    getCourseById,
    addCourse,
    updateCourse,
    deleteCourse
}