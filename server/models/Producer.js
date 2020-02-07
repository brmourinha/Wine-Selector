const mongoose = require('mongoose');

const ProducerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  region: {
    type: String,
    required: [true, 'Please add a region']
  },
  createdYear: {
    type: Number,
    required: [true, 'Please add a Year'],
    min: 1900,
    max: new Date().getFullYear()
  }
});

module.exports = mongoose.model('Producer', ProducerSchema);
