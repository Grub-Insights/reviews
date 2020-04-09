/* eslint-disable radix */
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const mongo = require('./db/mongoSeedScripts/readMongo');

const port = 5001;
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/public/')));

app.get('/restaurants/:restaurantId/reviews', (req, res) => {
  const restaurant = req.params.restaurantId;
  const start = parseInt(req.query.start);
  const sort = req.query.sort_by;
  const search = req.query.q;
  mongo.getReviews(res, restaurant);
});

app.patch('/restaurants/:restaurantId/reviews/:reviewId', (req, res) => {
  const voteInfo = {
    restaurant_id: Number(req.params.restaurantId),
    review_id: Number(req.params.reviewId),
    voteType: req.query.value,
    voteStatus: `${req.query.value.split('_')[0]}_count`,
    voted: Number(req.query.voted),
  };
  mongo.updateVoteCount(res, voteInfo);
  // db.updateReviewVote(voteInfo, (err, results) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.send(results);
  //   }
  // });
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
