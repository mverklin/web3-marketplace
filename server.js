const express = require('express');
const session = require('express-session');
const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Configure the Instagram strategy for Passport
passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: process.env.INSTAGRAM_REDIRECT_URI,
  },
  (accessToken, refreshToken, profile, done) => {
    profile.accessToken = accessToken; // Store access token in profile
    return done(null, profile);
  }
));

// Define routes
app.get('/auth/instagram',
  passport.authenticate('instagram'));

app.get('/auth/instagram/callback', 
  passport.authenticate('instagram', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/dashboard');
  });

app.get('/dashboard/data', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const { accessToken, id } = req.user;
    const url = `https://graph.instagram.com/${id}?fields=id,username,media_count,account_type,profile_picture_url&access_token=${accessToken}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Serve the frontend files
app.use(express.static('public'));

app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});
