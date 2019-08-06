require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const { CONNECTION_STRING, SESSION_SECRET } = process.env;
const authCtrl = require('./controllers/authController')
const app = express();
const treasureCtrl = require('./controllers/treasureController')

const PORT = 4000;
//middleware
app.use(express.json());

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
);
//endpoints
app.post('/auth/register',authCtrl.register)
app.post('/auth/login',authCtrl.login)
app.get('/auth/logout',authCtrl.logout)
app.get('/api/treasure/dragon',treasureCtrl.dragonTreasure)


massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  app.listen(PORT, () => console.log(`Can you hear me ${PORT}`));
});
