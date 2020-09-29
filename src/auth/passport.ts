const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "my-secret",
  algorithms: ["RS256"],
};

const initPassport = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      console.log("------------jwt ", jwt_payload);
    })
  );
};

export default initPassport;
