const { log } = require('console');
const express = require('express')
const path = require('path');
const fetch = require('node-fetch')
const app = express()
const { RecipeSearchClient } = require('edamam-api');
const http = require('http').createServer(app)
const port = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));

const recipeClient = new RecipeSearchClient({
  appId: process.env.APP_ID,
  appKey: process.env.API_KEY
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/', async (req, res) => {
  console.log(req.body);
  const results = await recipeClient.search({
    query: req.body.query,
    health: req.body.vegan ? ['vegan'] : req.body.vegetarian ? ['vegetarian'] : []
  })
  res.send(results)
});

http.listen(port, () => {
  console.log(`Listening on port ${port}.`)
})