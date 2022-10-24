const mongoose = require('mongoose');

const { Schema } = mongoose;

const DiscordRuleSchema = new Schema({
  rule: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('DiscordRule', DiscordRuleSchema);
