const mongoose = require('mongoose');

const icd10Schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  icd_code: {
    type: String,
    index: true,
    required: true,
    unique: true,
  },
  short_description: {
    type: String,
    required: true,
  },
  long_description : {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('icd10Model', icd10Schema, 'icd10-2019');
