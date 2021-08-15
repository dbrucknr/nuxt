const express = require("express");
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const db = require("./models");
db.sequelize.sync();

app.get('/', (req, res) => {
  res.send('Backend is working')
})

export default {
  path: '/api',
  handler: app
}