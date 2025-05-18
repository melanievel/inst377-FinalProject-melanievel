
const supabaseClient = require('@supabase/supabase-js');
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
//const apiKey = process.env.API_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/randomData', async (req, res) => {
  const apiKey = process.env.API_KEY;
  const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
  const data = await response.json();
  res.json(data);
});

// app.post('/data', async (req, res) => {
//   const apiKey = process.env.API_KEY;
//   const cuisine = req.body.cuisine;
//   const checkedDiets = req.body.checkedDiets;
//   const checkedIntolerances = req.body.checkedIntolerances;
//   const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&diet=${checkedDiets}&intolerances=${checkedIntolerances}&apiKey=${apiKey}`);
//   const data = await response.json();
//   //res.json(data);
//   res.send(JSON.stringify(errorJson));
//   return;
// });

// app.post('/data', async (req, res) => {
//   const apiKey = process.env.API_KEY;
//   const cuisine = req.body.cuisine;
//   const checkedDiets = req.body.checkedDiets;
//   const checkedIntolerances = req.body.checkedIntolerances;

//   try {
//     const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&diet=${checkedDiets}&intolerances=${checkedIntolerances}&apiKey=${apiKey}`, {
//       method: 'GET',
//     });
//     const apiData = await apiResponse.json();

//   } catch (error) {
//     console.error('Server-side fetch error:', error);
//     res.status(500).json({ error: 'Failed to fetch data' });
//   }
// });

app.post('/data', (req, res) => {
  const apiKey = process.env.API_KEY;
  const cuisine = req.body.cuisine;
  const checkedDiets = req.body.checkedDiets;
  const checkedIntolerances = req.body.checkedIntolerances;
  const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&diet=${checkedDiets}&intolerances=${checkedIntolerances}&apiKey=${apiKey}`;

  fetch(url, {
    method: 'POST',
  
  })
  .then(response => response.json())
  .then(data => {
    res.send(data);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});



app.get('/search', async (req, res) => {
  const apiKey = process.env.API_KEY;
  const id = req.body.id;
  const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`);
  const data = await response.json();
  res.json(data);
});


// app.get('/home', async (req, res) => {
//   res.sendFile('/Users/melanie/Desktop/INST377 /inst377-FinalProject-melanievel/public/homePage.html', { root: __dirname });
// });
app.get('/', (req, res) => {
  res.sendFile('public/HomePage.html', { root: __dirname });
});

app.get('/about', async (req, res) => {
  res.sendFile('public/aboutPage.html', { root: __dirname });
});

app.get('/help', async (req, res) => {
  res.sendFile('public/helpPage.html', { root: __dirname });
});

app.get('/random', async (req, res) => {
  res.sendFile('public/randomRecipe.html', { root: __dirname });
});

app.get('/recipes', async (req, res) => {
  res.sendFile('public/recipesPage.html', { root: __dirname });
});

app.get('/contact', (req, res) => {
  res.sendFile('public/contactPage.html', { root: __dirname });
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

  res.send(JSON.stringify(errorJson));
  return;
});


app.listen(port, () => {
  console.log('App is alive', port);
});