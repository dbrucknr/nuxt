const express = require("express");
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const db = require("./models");
db.sequelize.sync();

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.get('/', (req, res) => {
  res.send('Backend is working')
})

export default {
  path: '/api',
  handler: app
}