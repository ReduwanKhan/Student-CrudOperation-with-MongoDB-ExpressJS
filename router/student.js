const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

router.post("/create", async (req, res) => {
  const db = req.db;
  const reqBody = req.body;
  try {
    const result = await db.collection("students").insertOne(reqBody);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/get", async (req, res) => {
  const db = req.db;

  try {
    const result = await db.collection("students").find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/get-single/:id", async (req, res) => {
  const db = req.db;
  const id = req.params.id;

  try {
    const result = await db
      .collection("students")
      .findOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/update/:id", async (req, res) => {
  const db = req.db;
  const id = req.params.id;
  const reqBody = req.body;

  try {
    const result = await db
      .collection("students")
      .updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/delete/:id", async (req, res) => {
  const db = req.db;
  const id = req.params.id;
  //   const reqBody = req.body;

  try {
    const result = await db
      .collection("students")
      .deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
