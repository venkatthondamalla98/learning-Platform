const mongoose = require("mongoose");
const Joi = require("joi");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 20 },
  
    isEnrolled: {
      type: Boolean,
      default: false
    },
  
    phone: {
      type: String,
      minLength: 10,
      maxLength: 12,
      required: true
    }
  });
  
  const Student = mongoose.model("Student", studentSchema);

  function validation(student) {
    const schema = {
      name: Joi.string().min(3).required(),
      isEnrolled: Joi.boolean(),
      phone: Joi.string().min(10).max(12)
    };
  
    return Joi.validate(student, schema);
  }

module.exports = {
    Student,
    validation
}