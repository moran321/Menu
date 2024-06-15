const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let lastMenu = 1;

const menus = {
  1: [
    {
      id: 1,
      name: "פילה עוף דה-שילס עם הרוטב הסודי 49",
      photo: "dish1.jpg",
      votes: 0,
      description:
        "נתחי פילה עוף עסיסיים בעשבי תיבול טריים, צלויים על גריל פחמים ייחודי. מלווה ברוטב הסודי של השף, המוסיף עומק ועושר טעמים. מוגש עם ירקות קלויים- פלפלים צבעוניים, זוקיני עגבניות שרי וויטני ובצל סגול.",
    },
    {
      id: 2,
      name: "חזה עוף במרינדת לימון ושום 52",
      photo: "dish2.jpg",
      votes: 0,
      description:
        "חזה עוף צרוב מתובל במרינדת לימון ושום. מוגש עם תפוחי אדמה אפויים וסלט ירוק קטן.",
    },
    {
      id: 3,
      name: "עוף מוקפץ עם ירקות ואורז 48",
      photo: "dish3.jpg",
      votes: 0,
      description:
        "נתחי עוף מוקפצים עם פלפלים, גזר, ברוקולי, שעועית ובצל ירוק, מוגשים על מצע של אורז יסמין.",
    },
    {
      id: 4,
      name: "עוף בתנור עם פפריקה ושום 54",
      photo: "dish4.jpg",
      votes: 0,
      description:
      "שני שוקי עוף מתובלים בפפריקה חריפה ושום, אפויים בתנור. מוגשים עם אפונה, שעועית, גזר פרוס וסלט כרוב",
    },
  ],
  2: [
    {
      id: 1,
      name: "עוף בתנור עם פפריקה ושום 54",
      photo: "dish4.jpg",
      votes: 0,
      description:
      "שני שוקי עוף מתובלים בפפריקה חריפה ושום, אפויים בתנור. מוגשים עם אפונה, שעועית, גזר פרוס וסלט כרוב",
    },
    {
      id: 2,
      name: "חזה עוף במרינדת לימון ושום 52",
      photo: "dish2.jpg",
      votes: 0,
      description:
        "חזה עוף צרוב מתובל במרינדת לימון ושום. מוגש עם תפוחי אדמה אפויים וסלט ירוק קטן.",
    },
    {
      id: 3,
      name: "עוף מוקפץ עם ירקות ואורז 48",
      photo: "dish3.jpg",
      votes: 0,
      description:
        "נתחי עוף מוקפצים עם פלפלים, גזר, ברוקולי, שעועית ובצל ירוק, מוגשים על מצע של אורז יסמין.",
    },
    {
      id: 4,
      name: "חזה עוף ברוטב פסטו 49",
      photo: "dish5.jpg",
      votes: 0,
      description:
        "נתחי חזה עוף צרובים ומתובלים ברוטב פסטו. מוגש עם מגוון ירקות קלויים.",
    },
  ],
};

app.get("/menu", (req, res) => {
  lastMenu = lastMenu === 1 ? 2 : 1; // rotate between 2/1 each call
  res.json({ id: lastMenu, menu: menus[lastMenu] });
});

// app.get("/menu/:id", (req, res) => {
//   const menuId = parseInt(req.params.id);
//   res.json(menus[menuId]);
// });

app.post("/vote", (req, res) => {
  const { dishId, menuId } = req.body;
  if (menus[menuId].find((dish) => dish.id == dishId) !== undefined) {
    let dish = menus[menuId].find((dish) => dish.id == dishId);
    dish.votes++;
    res.send({ message: "Vote submitted successfully" });
  } else {
    res.status(404).send({ message: "Dish not found" });
  }
});

app.get("/results/:id", (req, res) => {
  const menuId = parseInt(req.params.id);
  const results = menus[menuId];
  console.log(results);
  res.json(results);
});

// app.get('/results/:id', (req, res) => {
//   const menuId = parseInt(req.params.id);
//   const results = Object.keys(menus[menuId]).map(name => ({
//     name,
//     menus: menus[menuId][name]
//   }));
//   console.log(results);
//   res.json(results);
// });

// New route to return an HTML response
app.get("/", (req, res) => {
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

app.listen(port, "", () => {
  console.log(`Server running at http://localhost:${port}`);
});
