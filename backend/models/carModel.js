const mongoose = require('mongoose');

const carSchema = mongoose.Schema(
  {
    user: {
      // assoc a user with a car post => type: id field, ref: associated with the User model.
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
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
