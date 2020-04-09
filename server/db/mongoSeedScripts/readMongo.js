const mongoose = require('mongoose');
const fake = require('faker');

const restaurantSchema = new mongoose.Schema({
  // restaurant_id: { type: Number, unique: true },
  _id: { type: Number, unique: true },
  name: String,
  reviews: [{
    _review_id: { type: Number, unique: true },
    date: Date,
    rating: Number,
    body: String,
    useful_count: Number,
    cool_count: Number,
    funny_count: Number,
    check_ins: Number,
    useful_vote: { type: Number, default: 0 },
    cool_vote: { type: Number, default: 0 },
    funny_vote: { type: Number, default: 0 },
    user: {
      _user_id: { type: Number, unique: true },
      name: String,
      profile_pic: String,
      reviews: Number,
      friends: Number,
      photos: Number,
      location: String,
    }
  }],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

mongoose.connect('mongodb://localhost/squawk', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('connected'); })
  .then(() => {
    console.log('connected');
  });

getReviews = (res, restaurant) => {
  let reviews = [];
  Restaurant.find({_id: restaurant}, (err, restaurants) => {
    if (err) { res.sendStatus(400); return console.error(err); } 
    else { reviews = restaurants[0].reviews; res.send(reviews); }
  });
}

updateVoteCount = (res, voteInfo) => {
  Restaurant.find({_id: voteInfo.restaurant_id}, (err, restaurants) => {
    if (err) { res.sendStatus(400); return console.error(err); }
    else {
      const UpdatedRestaurant = restaurants[0];
      UpdatedRestaurant.reviews.forEach((review) => {
        if (review._review_id === voteInfo.review_id) {
          if (voteInfo.voted === 0) { review[voteInfo.voteStatus] += 1; review[voteInfo.voteType] += 1; } 
          else { review[voteInfo.voteStatus] -= 1; review[voteInfo.voteType] -= 1; }
        }
      });
      const newRestaurant = new Restaurant(UpdatedRestaurant);
      Restaurant.updateOne({_id: voteInfo.restaurant_id}, UpdatedRestaurant, function(err, result, n){
        if (err) { res.sendStatus(400); return console.error(err); }
        else { console.log(result); res.send(result); }
    });
        // .then((err, results) => {
        //   console.log(results);
        // });
    }
  });
}

// if (reviewInfo.voted === 0) {
//   queryString = `UPDATE reviews SET ${reviewInfo.voteStatus} = ${reviewInfo.voteStatus} + 1, ${reviewInfo.voteType} = 1 WHERE review_id=${reviewInfo.id}`;
// } else {
//   console.log('voted');
//   queryString = `UPDATE reviews SET ${reviewInfo.voteStatus} = ${reviewInfo.voteStatus} - 1, ${reviewInfo.voteType} = 0 WHERE review_id=${reviewInfo.id}`;
// }

module.exports = {
  db,
  getReviews,
  updateVoteCount,
}