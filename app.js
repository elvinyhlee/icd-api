const data = require('./icd10_2019.json');
const express = require('express');
const bodyParser = require('body-parser');
const FlexSearch = require('flexsearch');
// const graphqlHttp = require('express-graphql');
// const { buildSchema } = require('graphql');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const index = new FlexSearch();

icd = {};
data.map(x =>
  Object.assign(icd, {[x['icd_code']]: x})
);

data.map(x =>
  index.add(x['icd_code'], x["short_description"])
);

app.get('/v1/:id', (req, res) => {
  const id = req.params.id;
  if (id in icd) {
    res.status(200).send(icd[id]);
  }
  else {
    res.status(400).send('sorry, wrong id');
  }
});


app.get('/suggestion/:query', (req, res) => {
  const query = req.params.query;
  const result_list = index.search(query, 50);
  const results = result_list.map(x =>
    icd[x]['short_description']
  );
  res.status(200).send(results);
});

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

app.listen(PORT);
