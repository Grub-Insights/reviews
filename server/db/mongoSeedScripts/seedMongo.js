const fake = require('faker');
const fs = require('fs');
const { profileImg } = require('../profileImages');

const writeRestaurantsAndReviews = fs.createWriteStream('server/db/seededResults/rANDrData.json');
function writeTenMillionRandR(writer, encoding, callback) {
  let i = 1000000;
  let idRev = 0;
  let idRest = 0;
  function write() {
    let ok = true;
    do {
      const reviewsArray = [];
      const numOfRevs = i % 1000 !== 0 ? Math.floor(Math.random() * 26) : 150;
      for (let j = 0; j < numOfRevs; j += 1) {
        // one review
        idRev += 1;
        const id_user = Math.floor(Math.random() * 99999 + 1);
        const date = fake.date.between('2000-01-10', '2020-01-21');
        const rating = Math.floor(Math.random() * 4 + 1);
        const body = fake.lorem.sentences(i % 1000 !== 0 ? Math.floor(Math.random() * 2 + 4) : 15).replace(/,/g, '.');
        const useful_count = Math.floor(Math.random() * 8 + 1);
        const cool_count = Math.floor(Math.random() * 5 + 1);
        const funny_count = Math.floor(Math.random() * 2 + 1);
        const check_ins = Math.floor(Math.random() * 3);
        reviewsArray.push({
          _review_id: idRev,
          date,
          rating,
          body,
          useful_count,
          cool_count,
          funny_count,
          check_ins,
          useful_vote: 0,
          cool_vote: 0,
          funny_vote: 0,
          user: {
          _user_id: id_user,
          name:  `${fake.name.firstName()} ${fake.name.lastName()[0]}`,
          profile_pic: profileImg[idRev % 19],
          reviews: Math.floor(Math.random() * 950 + 50),
          friends: Math.floor(Math.random() * 950 + 50),
          photos: Math.floor(Math.random() * 950 + 50),
          location: `${fake.address.city()}, ${fake.address.stateAbbr()}`,
        }
        });
      }
      i -= 1;
      idRest += 1;
      // one restaurant
      const data = JSON.stringify({
        _restaurant_id: idRest,
        name: fake.company.companyName(),
        reviews: reviewsArray,
      });
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
      // see if we should continue, or wait
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
    // had to stop early! write some more once it drains
      console.log(`...on ${(1000000 - i) / 1000000}`);
      writer.once('drain', write);
    }
  }
  write();
}

writeTenMillionRandR(writeRestaurantsAndReviews, 'utf-8', () => {
  writeRestaurantsAndReviews.end();
  console.log('...Done');
});
