const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 30 },
  });
  
  const Category = mongoose.model("Category", categorySchema);


function validation(category) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(category, schema);
}

module.exports = {
    Category,
    categorySchema,
    validation
}