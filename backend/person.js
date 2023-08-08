const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  // id: {
  //   type: Number,
  //   required: true,
  // },
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
    validate: {
      validator: function (value) {
        // Regular expression to validate email format
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email format',
    },
  },
  phone: {
    type: Number,
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  mathematics_mark: {
    type: Number,
    // required: true,
  },
  history_mark: {
    type: Number,
    // required: true,
  },
  science_mark: {
    type: Number,
    // required: true,
  },
  total_mark: {
    type: Number,
    // required: true,
  },
  status: {
    type: String,
    enum: ['Pass', 'Fail', 'Pending'],
    default: 'Pending',
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
