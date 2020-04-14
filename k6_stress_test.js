import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 10 }, // below normal load
    { duration: '1m', target: 20 }, // normal load
    { duration: '1m', target: 30 }, // around the breaking point
    { duration: '1m', target: 40 }, // beyond the breaking point
  ],
};

export default function() {
  const BASE_URL = 'http://localhost:5001'; // make sure this is not production
  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/restaurants/1/reviews`,
      null,
      { tags: { name: 'RestaurantReviews1' } },
    ],
    [
      'GET',
      `${BASE_URL}/restaurants/100001/reviews`,
      null,
      { tags: { name: 'RestaurantReviews100k' } },
    ],
    [
      'GET',
      `${BASE_URL}/restaurants/500001/reviews`,
      null,
      { tags: { name: 'RestaurantReviews500k' } },
    ],
    [
      'GET',
      `${BASE_URL}/restaurants/1000000/reviews`,
      null,
      { tags: { name: 'RestaurantReviews1mill' } },
    ],
  ]);
  responses.forEach((res) => {
    check(res, { 
      'status was 200': r => r.status == 200,
      // 'transaction time OK': r => r.timings.duration < 2000,
    });
  });
  sleep(0.1);
}