const express = require('express');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student');

const router = express.Router();

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new student
router.post('/', async (req, res) => {
  try {
    const { name, rollNumber, department, year, email, password } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const student = new Student({
      name,
      rollNumber,
      department,
      year,
      email,
      password: hashedPassword
    });

    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE student by ID
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET participation data by roll number
router.get('/participation/:rollNumber', async (req, res) => {
  try {
    const { rollNumber } = req.params;

    const student = await Student.findOne({ rollNumber }).populate('events').populate('clubs');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const participationData = {
      student: {
        name: student.name,
        rollNumber: student.rollNumber,
        department: student.department,
        year: student.year
      },
      events: student.events.map(event => ({
        id: event._id,
        name: event.name,
        date: event.date,
        status: event.status || 'Upcoming'
      })),
      clubs: student.clubs.map(club => ({
        id: club._id,
        name: club.name,
        description: club.description
      })),
      totalEvents: student.events.length,
      totalClubs: student.clubs.length
    };

    res.json(participationData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
