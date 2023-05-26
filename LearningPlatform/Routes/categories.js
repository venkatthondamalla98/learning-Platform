const express = require("express");

const { Category, validation } = require('../Models/categoriesModel');

const router = express.Router();



router.get("/", async (req, res) => {
  let categories = await Category.find();
  res.send(categories);
});

router.post("/", async (req, res) => {
  const { error } = validation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const category = new Category({
    name: req.body.name,
  });
  await category.save();
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!category)
    return res.status(404).send("category with the given id is not found");

  res.send(category);
});

router.delete("/:id", async (req, res) => {
  let category = await Category.findByIdAndRemove(req.params.id);

  if (!category)
    return res.status(404).send("category with the given id is not found");

  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category)
    return res.status(404).send("category with the given id is not found");
  res.send(category);
});


module.exports = router;
