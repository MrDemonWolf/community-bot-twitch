const mongoose = require('mongoose');

const { Schema } = mongoose;

const DiscordRulesSchema = new Schema({
  rule: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('DiscordRules', DiscordRulesSchema);
