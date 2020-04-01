# Project Name

> Project description

## Related Projects
  - https://github.com/Denali-Outdoors/reviews-server
  - https://github.com/Denali-Outdoors/reservations-server
  - https://github.com/Denali-Outdoors/image-carousel-server

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions
1. Run the command $ npm install to install dependencies
2. enter your MYSQL credentials in the file ./server/config.js
3. create database "Squawk" if it does not already exist
4. execute the command $ npm run seed to add data to the database
5. start the server by executing the command $ npm run server-dev
6. execute the command $ npm run react-dev to run webpack and bundle the app
7. Navigate to localhost:5001

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### API Documentation
- Send a get request to '/restaurants/:restaurantId' and recieve reviews for a given property
  - Required: restaurantId (int)
  - Optional: start (int) --> specifies the review number to start on
  - Optional: sort_by (string) --> 'Newest First', 'Oldest First', 'Highest Rated', or 'Lowest Rated'
  - Optional: q (string) --> specifies a filter that you would like to search by
- Send a get request to '/reviews/:restaurantId' and receive the number of reviews asaociated with that restaurant
  - Required: restaurantId (int)
- send a patch request to '/review/:reviewId' and receive an updated review
  - Required: restaurantId (int)
  - Required: value (int) --> 'funny_vote', 'cool_vote', or 'useful_vote'
  - Required: voted (int) --> 0 for a vote, 1 to remove a vote
- send a put request to '/restaurants/name' and receive confirmation that you updated a restaurant in the database
  - Required: name (string)
  - Required: oldName (string)
- send a post request to '/restaurants/name' and recieve confirmation that you added a restaurant in the database
  - Required: name (string)
- send a delete request to '/restaurants/name' and receive confirmation that you deleted a restaurant from the database
  - Required: name (string)


### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

