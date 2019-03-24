const express = require('express');
const FlexSearch = require('flexsearch');

const icd10Model = require('./icd10Model');
const router = express.Router();
const index = new FlexSearch();

icd10Model
  .find({})
  .cursor()
  .on('data', (doc) => {
    if (doc['inclusion_term']) {
      // TODO(Elvin): tokenize the description properly
      index.add(doc['code'], doc['long_description'] + ", " + doc['inclusion_term'].join());
    } else {
      index.add(doc['code'], doc['long_description']);
    }
  });

router.get('/:id', (req, res) => {
  icd10Model
    .find({ code: req.params.id }, (err, icdInstance) => {
      if (err) return res.status(500).send('There was a problem finding the icd code');
      if (!icdInstance) return res.status(404).send('No icd code found.');
      return res.status(200).json(icdInstance);
    })
});

router.get('/suggestion/:query', (req, res) => {
  const result_list = index.search(req.params.query, 10);
  icd10Model
    .find({code: {$in:result_list}}, (err, icdInstance) => {
      if (err) return res.status(500).send('There was a problem finding the icd code');
      if (!icdInstance) return res.status(404).send('No icd code found.');
      return res.status(200).json(icdInstance);
    });
});

module.exports = router;
