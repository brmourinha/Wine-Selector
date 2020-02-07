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
  region: {
    type: String,
    required: [true, 'Please add a region']
  },
  producer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Producer',
    required: true
  }
});

module.exports = mongoose.model('Wine', WineSchema);
