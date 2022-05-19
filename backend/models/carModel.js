const mongoose = require('mongoose');

const carSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Add a text value'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Car', carSchema);
