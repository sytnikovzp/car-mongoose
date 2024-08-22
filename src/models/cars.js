const mongoose = require('mongoose');
// ==========================
const { Schema } = mongoose;

const carSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    engine_type: {
      type: String,
      required: true,
    },
    bodywork_type: {
      type: String,
      required: true,
    },
    gear_type: {
      type: String,
      required: true,
    },
    new: {
      type: Boolean,
      default: false,
    },
    logo: {
      type: String,
    },
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Type',
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
