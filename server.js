const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const dishes  = [
  { id: 1, name: 'פילה עוף דה שילס עם הרוטב הסודי 49', votes: 0 },
  { id: 2, name: 'חזה עוף במרינדת לימון ושום 52', votes: 0 },
  { id: 3, name: 'עוף מוקפץ עם ירקות ואורז 48', votes: 0 },
  { id: 4, name: 'שניצל עוף פריך עם פירה 50', votes: 0 }
];  

app.post('/vote', (req, res) => {
  const { id } = req.body;
  const dish = dishes.find(d => d.id === id);
  if (dish) {
    dish.votes += 1;
    res.send({ message: 'Vote submitted successfully' });
  } else {
    res.status(404).send({ message: 'Dish not found' });
  }
});

app.get('/results', (req, res) => {
  res.send(dishes);
});

// New route to return an HTML response
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Server API</title>
      </head>
      <body>
        <h1>Demo API!</h1>
      </body>
    </html>
  `);
});

app.listen(port, '');
