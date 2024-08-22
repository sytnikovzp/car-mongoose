const mongoose = require('mongoose');
// ==========================
const { Schema } = mongoose;

const typeSchema = new Schema(
  {
    type: {
      type: String,
      unique: true,
      required: true,
      match: /^[A-Z]\w*/g,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Type = mongoose.model('Type', typeSchema);

module.exports = Type;
