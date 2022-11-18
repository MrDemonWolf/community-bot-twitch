const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');

const { Schema } = mongoose;

const TwitchStatusSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
  },
  category: {
    type: String,
    required: true,
  },
  command: {
    type: String,
    ungique: true,
    required: true,
  },
});

TwitchStatusSchema.pre('save', (next) => {
  // nanoid create a random string with 10 characters and a-z, A-Z, 0-9 characters only and assign it to the command field
  this.command = customAlphabet(
    '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    10
  )();

  next();
});

module.exports = mongoose.model('TwitchStatus', TwitchStatusSchema);
