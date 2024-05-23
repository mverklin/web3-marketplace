const express = require('express');
const session = require('express-session');
const axios = require('axios');
const app = express();
const PORT = 5001;

app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true,
}));

app.get('/auth/instagram', (req, res) => {
  const redirectUri = 'http://localhost:5001/auth/instagram/callback';
  res.redirect(`https://api.instagram.com/oauth/authorize?client_id=1095015788267581&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`);
});

app.get('/auth/instagram/callback', async (req, res) => {
  const code = req.query.code;
  const redirectUri = 'http://localhost:5001/auth/instagram/callback';

  try {
    const response = await axios.post(`https://api.instagram.com/oauth/access_token`, {
      client_id: '1095015788267581',
      client_secret: 'ace0398d1b7f51efbc6ccb3bf3af96d9',
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      code: code,
    });

    req.session.accessToken = response.data.access_token;
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error exchanging code for token', error);
    res.send('Error exchanging code for token');
  }
});

app.get('/dashboard/data', async (req, res) => {
  if (!req.session.accessToken) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const response = await axios.get(`https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${req.session.accessToken}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Instagram data', error);
    res.status(500).send('Error fetching Instagram data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
