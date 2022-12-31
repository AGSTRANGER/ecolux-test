const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../Models/User");
const { AUTH_SECRET } = process.env;

const normal_request_authentication_options = {};

normal_request_authentication_options.jwtFromRequest =
  ExtractJwt.fromAuthHeaderAsBearerToken();

module.exports = (passport) => {
  normal_request_authentication_options.secretOrKey = AUTH_SECRET;
  passport.use(
    "normal-request-authentication-strategy",
    new JwtStrategy(
      normal_request_authentication_options,
      (jwt_payload, done) => {
        User.findById(jwt_payload.id).then((user) => {
          if (user) {
            //error = null
            return done(null, user);
          }
          //false as the second parameter because there's no user
          return done(null, false);
        });
      }
    )
  );
};
