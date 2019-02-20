const express = require('express');
// const FlexSearch = require('flexsearch');
// const graphqlHttp = require('express-graphql');
// const { buildSchema } = require('graphql');

const icd10Model = require('./icd10Model');

const router = express.Router();

// const index = new FlexSearch("memory");

// index.add(x['icd_code'], x["short_description"])
router.get('/:id', (req, res) => {
  icd10Model.findById(req.params.id, (err, icdInstance) => {
    if (err) return res.status(500).send('There was a problem finding the icd code');
    if (!icdInstance) return res.status(404).send('No icd code found.');
    return res.status(200).json(icdInstance);
  })
});

// app.get('/suggestion/:query', (req, res) => {
//   const query = req.params.query;
//   const result_list = index.search(query, 50);
//   const results = result_list.map(x =>
//     icd[x]['short_description']
//   );
//   res.status(200).send(results);
// });

// app.use('/graphql', graphqlHttp({
//   schema: buildSchema(`
//     type icd {
//       icd_code: String!
//       short_description: String!
//       long_description: String!
//     }
//     type Query {
//       icd(icd_code: String): icd
//     }
//   `),
//   rootValue: {
//     icd: ({ icd_code }) => {
//       return 'Hello World!';
//     },
//   },
//   graphiql: true,
// }));

module.exports = router;
