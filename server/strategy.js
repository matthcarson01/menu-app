const Auth0Strategy = require("passport-auth0");
const { domain, clientID, clientSecret } = require("../keys/config").auth0;

module.exports = new Auth0Strategy(
  {
    domain: domain,
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "/login"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
      console.log(profile);
      app.get("db")
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
