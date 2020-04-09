/* eslint-disable radix */
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const db = require('./db');
const mongo = require('./db/mongoSeedScripts/readMongo');

const port = 5001;
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/public/')));

app.get('/restaurants/:restaurantId/reviews', (req, res) => {
  const restaurant = req.params.restaurantId;
  const start = parseInt(req.query.start);
  const sort = req.query.sort_by;
  const search = req.query.q;
  mongo.getReviews(req, res, restaurant, sort);
});

// app.get('/restaurants/:restaurantId/numberofreviews', (req, res) => {
  // let query;
  // if (req.query.q) {
  //   query = req.query.q;
  //   db.getQueryTotal(req.params.restaurantId, query, (err, results) => {
  //     if (err) {
  //       res.sendStatus(err);
  //     } else {
  //       const count = (JSON.stringify(results).slice(14, 17));
  //       res.send(count);
  //     }
  //   });
  // } else {
  //   db.getTotalReviews(req.params.restaurantId, (err, results) => {
  //     if (err) {
  //       res.sendStatus(err);
  //     } else {
  //       const count = (JSON.stringify(results).slice(14, 17));
  //       res.send(count);
  //     }
  //   });
  // }
// });

app.patch('/reviews/:reviewId', (req, res) => {
// http://localhost:5000/reviewId/9676?value=cool_count&voted=true
  const voteInfo = {
    id: Number(req.params.reviewId),
    voteType: req.query.value,
    voteStatus: `${req.query.value.split('_')[0]}_count`,
    voted: Number(req.query.voted),
  };
  console.log(voteInfo);
  db.updateReviewVote(voteInfo, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

const jsonParser = bodyParser.json();

app.post('/restaurants/:name', jsonParser, (req, res) => {
  db.postRestaurant(req, res);
});

app.put('/restaurants/:restaurantId', jsonParser, (req, res) => {
  db.updateRestaurant(req, res);
});

app.delete('/restaurants/:restaurantId', jsonParser, (req, res) => {
  db.deleteRestaurant(req, res);
});

app.listen(port, () => console.log(`SQUAWK listening on port ${port}!`));
