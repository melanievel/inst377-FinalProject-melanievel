# inst377-FinalProject-melanievel

INST377 Final Project - Recipes website

The purpose of this website is to give college students recipe ideas to improve their nutrition. Many college students don't practice good nutrition for different reasons; financial reasons, poor time management, not being sufficiently skilled at cooking, etc. This website allows students to find simple recipes and recipes that fit their specific circumstances. They have the option to click and choose different options to narrow down their search. 

This website is meant for both iOS and Android browsers. Functional on Chrome, Safari, Firefox and Edge.

<br>

# Developer Manual

## How to install application and all dependencies
Install npm packages:
- npm install
- npm install express
- npm install nodemon
- npm install dotenv
- npm install @supabase/supabase-js
- npm start

This application uses [Supabase](https://supabase.com/) database
This application was deployed through [Vercel](https://vercel.com/)

## How to run application on a server
Click on the first link (vercel link) in the about section of this GitHub repository to open the deployed webpage on a server using vercel


## The API for the server application - all GET, POST, PATCH, etc endpoints, and what they each do
The API used for this server application was [Spoonacular.com](https://spoonacular.com/food-api)

-app.get('/randomData')
-- Uses a local path to access the Spoonacular API and get the information of a random recipe
-app.get('/{page}')
-- Uses a local path to access the desired page within the application
-app.get('/contact')
-- Used to access the database table from supabase
-app.post('/contact')
-- Used to input the desired data into the database



