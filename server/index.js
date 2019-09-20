require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const { CONNECTION_STRING, SESSION_SECRET,PORT} = process.env;
const app = express();
const authCtrl = require("./controllers/authController");
const treasureCtrl = require("./controllers/treasureController");
const auth = require('./middleware/authMiddleware')




//middleware
app.use(express.json());

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
);



// endpoints
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.get("/auth/logout", authCtrl.logout);
app.get("/api/treasure/dragon", treasureCtrl.dragonTreasure);
//this middleware defines that only approved registered or logged in users can access this site.
//very useful for any application where you want to provide certain users the ability to access specific sites.
app.get("/api/treasure/user", auth.usersOnly,treasureCtrl.getUserTreasure);
app.post('/api/treasure/user', auth.usersOnly,treasureCtrl.addUserTreasure)
app.get('/api/treasure/all',auth.usersOnly, treasureCtrl.getAllTreasure)




massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  app.listen(PORT, () => console.log(`Can you hear me ${PORT}`));
});
