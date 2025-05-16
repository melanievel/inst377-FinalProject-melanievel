
import { createClient } from '@supabase/supabase-js';
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const apiKey = process.env.API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/randomData', async (req, res) => {
  const apiKey = process.env.API_KEY;
  const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
  const data = await response.json();
  res.json(data);
});


app.get('/home', async (req, res) => {
  res.sendFile('inst377-FinalProject-melanievel/Public/homePage.html', { root: __dirname });
});

app.get('/about', async (req, res) => {
  res.sendFile('inst377-FinalProject-melanievel/Public/aboutPage.html', { root: __dirname });
});

app.get('/contact', async (req, res) => {
  res.sendFile('inst377-FinalProject-melanievel/Public/ContactPage.html', { root: __dirname });
});

app.get('/help', async (req, res) => {
  res.sendFile('inst377-FinalProject-melanievel/Public/helpPage.html', { root: __dirname });
});

app.get('/random', async (req, res) => {
  res.sendFile('inst377-FinalProject-melanievel/Public/randomRecipe.html', { root: __dirname });
});

app.get('/recipes', async (req, res) => {
  res.sendFile('inst377-FinalProject-melanievel/Public/recipesPage.html', { root: __dirname });
});

app.get('/', (req, res) => {
  res.sendFile('inst377-FinalProject-melanievel/Public/ContactPage.html', { root: __dirname });
});

app.get('/contact', async (req, res) => {

  const { data, error } = await supabase.from('contact').select();

  if (error) {
    console.log('Error');
    res.send(error);
  } else {
    res.send(data);
  }
});

app.post('/contact', async (req, res) => {
  console.log(req.body);
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
 
  const { data, error } = await supabase
    .from('contact')
    .insert({
      user_name: name,
      user_email: email,
      user_message: message,
    })
    .select();

  if (error) {
    console.log('Error');
    res.send(error);
  } else {
    res.send(data);
  }
});

app.listen(port, () => {
  console.log('App is alive', port);
});