const mongoose = require('mongoose');

const icd10Schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  code: {
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
  valid_for_submission: {
    type: Boolean,
    required: true,
  },
  excludes_1: {
    type: [String],
    required: true,
  },
  excludes_2: {
    type: [String],
    required: true,
  },
  includes: {
    type: [String],
    required: true,
  },
  inclusion_term: {
    type: [String],
    required: true,
  },
  code_also: {
    type: [String],
    required: true,
  },
  use_additional_code: {
    type: [[String]],
    required: true,
  },
  code_first: {
    type: [String],
    required: true,
  },
  notes: {
    type: [String],
    required: true,
  },
  seven_character_note: {
    type: String,
    required: true,
  },
  seven_character_definition: {
    type: [],
    required: true,
  }
});

module.exports = mongoose.model('icd10Model', icd10Schema, 'icd10_2019_code');
