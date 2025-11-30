const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

// Get all clubs
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find().populate('events');
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get club by ID
router.get('/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id).populate('events');
    if (!club) return res.status(404).json({ message: 'Club not found' });
    res.json(club);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new club
router.post('/', async (req, res) => {
  const club = new Club(req.body);
  try {
    const newClub = await club.save();
    res.status(201).json(newClub);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
