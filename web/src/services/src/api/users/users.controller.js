const express = require("express");
const router = express.Router();

const usersHandler = require("./users.handler");

router.post("/users", async (req, res) => {
  try {
    const savedUser = await usersHandler.createUser(req.body);
    res.status(200).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/users", async (req, res) => {
  usersHandler.getUsers()
  .then((result) => {
    res.status(200).json(result);
  })
  .catch((error) => {
    res.status(500).json(error);
  });
});

module.exports = router;