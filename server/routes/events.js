const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('club');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('club');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new event
router.post('/', async (req, res) => {
  try {
    const { club, ...eventData } = req.body;

    // Find club by name if club is a string
    let clubId = club;
    if (typeof club === 'string' && !mongoose.Types.ObjectId.isValid(club)) {
      const Club = require('../models/Club');
      const foundClub = await Club.findOne({ name: club });
      if (!foundClub) {
        return res.status(400).json({ message: 'Club not found' });
      }
      clubId = foundClub._id;
    }

    const event = new Event({
      ...eventData,
      club: clubId
    });

    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Register for event
router.post('/:id/register', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const { studentId } = req.body;
    if (!studentId) return res.status(400).json({ message: 'Student ID required' });

    // Convert studentId to ObjectId if it's a string
    const studentObjectId = mongoose.Types.ObjectId.isValid(studentId)
      ? studentId
      : mongoose.Types.ObjectId(studentId);

    // Check if already registered
    if (event.participants && event.participants.some(id => id.toString() === studentObjectId.toString())) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Add student to participants list
    event.participants = event.participants || [];
    event.participants.push(studentObjectId);
    await event.save();

    // Also add event to student's events list
    const Student = require('../models/Student');
    await Student.findByIdAndUpdate(studentObjectId, {
      $addToSet: { events: event._id }
    });

    res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE event by ID
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
