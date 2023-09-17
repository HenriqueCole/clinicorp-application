const express = require("express");
const router = express.Router();

const { createUser, getUsers } = require("./users.handler");

router.post("/users", async (req, res) => {
  try {
    const savedUser = await createUser(req.body);
    res.status(200).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;