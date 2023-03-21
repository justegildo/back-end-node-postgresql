const { Client } = require('pg');
 
const recipePost = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'recipe',
  password: 'Juste@gildo23',
  port: 5432,
});

recipePost.connect();

module.exports = recipePost;