// import mysql
const mysql = require('mysql');
// import config for connection
const mysqlConfig = require('./config.js');
// create connection
const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
  if (err) {
    console.log('FAILED TO CONNECT TO DB');
  } else {
    console.log('CONNECTED TO DB');
  }
});

function getReviews(businessId, start = null, sort = null, search = null, callback) {
  let sortBy = '';
  console.log();
  if (sort !== null) {
    if (sort === 'rating_desc') {
      sortBy = 'ORDER BY reviews.rating DESC';
    } else if (sort === 'rating_asc') {
      sortBy = 'ORDER BY reviews.rating ASC';
    } else if (sort === 'date_asc') {
      sortBy = 'ORDER BY reviews.date ASC';
    } else if (sort === 'date_desc') {
      sortBy = 'ORDER BY reviews.date DESC';
    }
  } else {
    sortBy = '';
  }
  let searchQuery = '';

  if (search !== null) {
    searchQuery = ` AND body LIKE '%${search}%'`;
  } else {
    searchQuery = '';
  }
  let startQuery;
  if (!isNaN(start)) {
    startQuery = `LIMIT ${start}, 20`;
  } else {
    startQuery = 'LIMIT 20';
  }

  const queryString = `SELECT * FROM reviews INNER JOIN users ON (reviews.id_User = users.user_id) WHERE id_Restaurants = ${businessId}${searchQuery} ${sortBy} ${startQuery}`;
  connection.query(queryString, callback, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
}

function getTotalReviews(businessId, callback) {
  const queryString = `SELECT COUNT (*) FROM reviews WHERE id_Restaurants = ${businessId}`;
  connection.query(queryString, callback, (err, results) => {
    if (err) {
      callback(err);
    } else {
      // console.log(results)
      callback(null, results);
    }
  });
}
function getQueryTotal(businessId, query, callback) {
  const queryText = ` AND body LIKE '%${query}%'`;
  const queryString = `SELECT COUNT (*) FROM reviews WHERE id_Restaurants = ${businessId}${queryText}`;
  connection.query(queryString, callback, (err, results) => {
    if (err) {
      callback(err);
    } else {
      // console.log(results)
      callback(null, results);
    }
  });
}
// } else if (reviewInfo.voted < 0 || reviewInfo.voted < 1) {
//   queryString = `UPDATE reviews SET ${reviewInfo.voteStatus} = ${reviewInfo.voteStatus} + 1 WHERE review_id=${reviewInfo.id}`;
// }

function updateReviewVote(reviewInfo, callback) {
  // console.log(reviewInfo.voted, reviewInfo.voteType);
  let queryString;
  console.log(reviewInfo);
  if (reviewInfo.voted === 0) {
    queryString = `UPDATE reviews SET ${reviewInfo.voteStatus} = ${reviewInfo.voteStatus} + 1, ${reviewInfo.voteType} = 1 WHERE review_id=${reviewInfo.id}`;
  } else {
    console.log('voted');
    queryString = `UPDATE reviews SET ${reviewInfo.voteStatus} = ${reviewInfo.voteStatus} - 1, ${reviewInfo.voteType} = 0 WHERE review_id=${reviewInfo.id}`;
  }
  connection.query(queryString, (err) => {
    if (err) {
      console.log(err);
    } else {
      const updatedInfoQuery = `SELECT * FROM reviews WHERE review_id = ${reviewInfo.id}`;
      connection.query(updatedInfoQuery, (error, result) => {
        if (error) {
          console.log(err, 'second callback');
        } else {
          callback(null, result);
        }
      });
    //   callback(null, results);
    }
  });
}

function postRestaurant(req, res) {
  connection.query(`INSERT INTO restaurants (name) VALUES ("${req.query.name}")`, (error, results) => {
    if (error) throw error;
    else res.send(results);
  });
}

function updateRestaurant(req, res) {
  connection.query(`UPDATE restaurants SET name="${req.query.name}" WHERE name="${req.query.oldName}"`, (error, results) => {
    if (error) throw error;
    else res.send(results);
  });
}

function deleteRestaurant(req, res) {
  connection.query(`DELETE FROM restaurants WHERE name="${req.query.name}"`, (error, results) => {
    if (error) throw error;
    else res.send(results);
  });
}

module.exports.connection = connection;
module.exports.getReviews = getReviews;
module.exports.updateReviewVote = updateReviewVote;
module.exports.getTotalReviews = getTotalReviews;
module.exports.getQueryTotal = getQueryTotal;
module.exports.postRestaurant = postRestaurant;
module.exports.updateRestaurant = updateRestaurant;
module.exports.deleteRestaurant = deleteRestaurant;
