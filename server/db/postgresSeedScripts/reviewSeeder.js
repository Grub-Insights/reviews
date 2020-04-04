const fake = require('faker');
const fs = require('fs');

const writeReviews = fs.createWriteStream('server/db/seededResults/reviewsData.csv');
writeReviews.write('_review_id,id_User,date,rating,body,useful_count,cool_count,funny_count,check_ins\n', 'utf8');

function writeTenMillionUsers(writer, encoding, callback) {
  let i = 14855680;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const id_user = Math.floor(Math.random() * 99999 + 1);
      const id_restaurants = Math.floor(Math.random() * 99999 + 1);
      const date = fake.date.between('2000-01-10', '2020-01-21');
      const rating = Math.floor(Math.random() * 4 + 1);
      const body = fake.lorem.sentences(i % 20 !== 0 ? Math.floor(Math.random() * 3 + 3) : 20);
      const useful_count = Math.floor(Math.random() * 8 + 1);
      const cool_count = Math.floor(Math.random() * 5 + 1);
      const funny_count = Math.floor(Math.random() * 2 + 1);
      const check_ins = Math.floor(Math.random() * 3);
      const data = `${id},${id_user},${id_restaurants},${date},${rating},${body},${useful_count},${cool_count},${funny_count},${check_ins},\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
      // see if we should continue, or wait
      // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
    // had to stop early!
    // write some more once it drains
      console.log(`...on ${i/14855680}...finished at 0`);
      writer.once('drain', write);
    }
  }
  write();
}

writeTenMillionUsers(writeReviews, 'utf-8', () => {
  writeReviews.end();
  console.log('...done');
});
