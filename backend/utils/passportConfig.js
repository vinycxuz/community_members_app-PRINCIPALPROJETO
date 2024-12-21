const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20')

const User = require('../models/user/user.model');

passport.use(new LocalStrategy({
  usernameField: 'email', // changed from 'username' to 'email'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Invalid username or password' });
    }
  } catch (error) {
    return done(error);
  }
}
));

const option = {
  jwtFromRequest: ExtractJWT.fromExtractors([(req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['access_token'];
    }
    return token;
  }]),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JWTStrategy(option, async (userDecoded, done) => {
  try {
    const user = await User.findById(userDecoded.id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }
  catch (error) {
    return done(error);
  }
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/user/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ googleId: profile.id });

    const { id, displayName, name, _json:{picture}} = profile

    let email = ''

    if (Array.isArray(profile.emails)) {
      email = profile.emails[0].value
    }

    if(!user){
      const user = await User.create({
        googleId: id,
        name: displayName || name,
        email,
        profilePicture: picture,
        authMethod: 'google'
      })
      return done(null, user)
    }

    done(null, newUser);
  } catch (error) {
    done(error);
  }
}));

module.exports = passport;
