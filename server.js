// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

const CLIENT_ID = 'BLlDukZrY6usnvDBNeBiMA';
const CLIENT_SECRET = 'tLOX1ntKFN3R5A07n1xxCGBQSZ7-nw';

app.use(cors());

let cachedToken = null;
let tokenExpiry = 0;

const getAccessToken = async () => {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const response = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  });

  const data = await response.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000;
  return cachedToken;
};

app.get('/api/posts/:subreddit', async (req, res) => {
  try {
    const token = await getAccessToken();
    const subreddit = req.params.subreddit;

    const response = await fetch(`https://oauth.reddit.com/${subreddit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'MyRedditApp/0.1',
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch from Reddit' });
  }
});

app.get('/api/subreddits', async (req, res) =>{
    const token = await getAccessToken();
    try {const response = await fetch('https://oauth.reddit.com/subreddits/popular.json',{
        headers: {
            Authorization: `Bearer ${token}`,
            'User-Agent': 'MyRedditApp/0.1',
        },
    });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching subreddits:', error);
        res.status(500).json({ error: 'Failed to fetch from Reddit'});
    }
});

app.get('/api/comments/:postId', async (req, res) => {
    try {
        const token = await getAccessToken();
        const postId = req.params.postId;

        console.log('Fetching comments for post ID:', postId);


        const response = await fetch(`https://oauth.reddit.com/comments/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'User-Agent': 'MyRedditApp/0.1',
            },
        });

      const raw = await  response.text();
        console.log( 'raw:', raw);

        const data = await response.json();
        if(Array.isArray(data)){
        console.log('reddit response:', data);
        res.json(data);
      } else {
        console.worn('Unexpected response format:', data);
        res.status(500).json({ error: 'Unexpected response format' });
      }
    }  catch (error){
        console.error( 'Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to fetch comments from Reddit' });
    }
}); 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
