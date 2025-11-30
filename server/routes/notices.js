const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');

// Get all notices
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get notice by ID
router.get('/:id', async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ message: 'Notice not found' });
    res.json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new notice
router.post('/', async (req, res) => {
  const notice = new Notice(req.body);
  try {
    const newNotice = await notice.save();
    res.status(201).json(newNotice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
