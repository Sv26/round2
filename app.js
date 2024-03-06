const express = require('express');
const bodyParser = require('body-parser');
const { Movie } = require('./models');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/favourites', async (req, res) => {
  const movies = await Movie.findAll();
  res.render('favourites.ejs', { movies });
});

app.post('/search', async (req, res) => {
  const { query } = req.body;
  const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`);
  const data = await response.json();
  if (data.Search) {
    res.render('search.ejs', { movies: data.Search });
  } else {
    res.send('No results found');
  }
});

app.post('/favourite', async (req, res) => {
  const { title, year, type, poster } = req.body;
  await Movie.create({ title, year, type, poster });
  res.redirect('/favourites');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});