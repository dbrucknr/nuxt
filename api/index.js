const express = require("express");
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const db = require("./models");
db.sequelize.sync();

const users = require("./controllers/user.controller");

// require("./routes/user.routes")(app);
app.post("/auth", users.create);
app.get('/', (req, res) => {
  res.send('Backend is working')
})

export default {
  path: '/api',
  handler: app
}