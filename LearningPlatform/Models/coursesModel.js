const mongoose = require('mongoose');
const Joi = require('joi');

const { categorySchema } = require('./categoriesModel')

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 20
    },

    category: {
        type: categorySchema,
        required: true
    },

    creator: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true
    }

})

const Course = mongoose.model('Course', courseSchema);

function courseValidation(course){
    const schema = {
        title: Joi.string().min(5).max(20).required(),
        category: Joi.string().required(),
        creator: Joi.string().min(5).required(),
        rating: Joi.number().required()
    };

    return Joi.validate(course, schema)
}

module.exports = {
    Course,
    courseValidation
}