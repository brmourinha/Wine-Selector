const mongoose = require('mongoose');

const WineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  type: {
    type: String,
    required: [true, 'Please add a type']
  },
  producer: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Wine', WineSchema);
