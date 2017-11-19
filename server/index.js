const express = require("express"),
  session = require("express-session"),
  { json } = require("body-parser"),
  cors = require("cors"),
  passport = require("passport"),
  request = require("request");
  Auth0Strategy = require("passport-auth0"),
  massive = require("massive");

const {connectionString} = require("../keys/config").database;
const { secret } = require("../keys/config").session;
const {domain, clientID, clientSecret} = require("../keys/config").auth0;
const controller = require('./controller/controller');
const port = 3001;

const app = express();
app.use(json());
app.use(cors());

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1800000 }
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new Auth0Strategy(
    {
      domain: domain,
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: "/login"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      app
        .get("db")
        .getUserByAuthId(profile._json.user_id)
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .createUserByAuth([profile._json.user_id, profile._json.name])
              .then(created => {
                return done(null, created[0]);
              });
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


massive(connectionString)
  .then(dbInstance => app.set('db', dbInstance))
  .catch(console.log);


//
app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/user/user-profile"
  })
);

app.get("/api/me", function(req, res) {
  if (!req.user) return res.status(404);
  res.status(200).json(req.user);
});

app.get("/api/user_restaurant/:id",controller.getRestaurant);
app.post("/api/user_restaurant/:id",controller.createRestaurant);


app.listen(port, () => {
  console.log(`Port: ${port}`);
});

