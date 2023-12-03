const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Create a user (POST)
router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.create({ username, email });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Read all users (GET)
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Read a user by ID (GET)
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Update a user (PUT)
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;
    const [updatedCount, updatedUsers] = await User.update(
      { username, email },
      { where: { id: userId }, returning: true }
    );
    if (updatedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUsers[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Delete a user (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedCount = await User.destroy({ where: { id: userId } });
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
