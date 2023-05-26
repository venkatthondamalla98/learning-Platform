const express = require("express");

const {Student, validation} = require('../Models/studentsModel');

const router = express.Router();


router.get("/", async (req, res) => {
  let students = await Student.find();
  res.send(students);
});

router.post("/", async (req, res) => {
  const { error } = validation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const student = new Student({
    name: req.body.name,
    isEnrolled: req.body.isEnrolled,
    phone: req.body.phone
  });
  await student.save();
  res.send(student);
});

router.put("/:id", async (req, res) => {
  const { error } = validation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let student = await Student.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, isEnrolled: req.body.isEnrolled, phone: req.body.phone},
    { new: true }
  );

  if (!student)
    return res.status(404).send("student with the given id is not found");

  res.send(student);
});

router.delete("/:id", async (req, res) => {
  let student = await Student.findByIdAndRemove(req.params.id);

  if (!student)
    return res.status(404).send("student with the given id is not found");

  res.send(student);
});

router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student)
    return res.status(404).send("student with the given id is not found");
  res.send(student);
});


module.exports = router;
