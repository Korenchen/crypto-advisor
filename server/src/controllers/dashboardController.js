const axios = require('axios');
const db = require('../db/database');

exports.getDashboardData = async (req, res) => {
  const userId = req.user.id;

  db.get(`SELECT preferences FROM users WHERE id = ?`, [userId], async (err, row) => {
    if (!row || !row.preferences) return res.status(400).json({ error: "Complete onboarding first" });
    const prefs = JSON.parse(row.preferences);


    let dashboardData = {
      prices: {},
      news: [{ title: "News temporarily unavailable", url: "#" }],
      aiInsight: "Your AI insight is being generated...",
      meme: "https://via.placeholder.com/400x300?text=Meme+Loading"
    };

    try {
      // 1. Fetch Prices (CoinGecko)
      const coinIds = prefs.assets.join(',');
      const pricesRes = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
            params: {
                ids: coinIds,
                vs_currencies: 'usd'
        },
        headers: {
      'x-cg-demo-api-key': process.env.COINGECKO_API_KEY
    }
  });
      dashboardData.prices = pricesRes.data;
    } catch (e) { console.error("Prices API Failed:", e.message);
        dashboardData.prices = prefs.assets.reduce((acc, coin) => {
        acc[coin] = { usd: 0 }; 
        return acc;
      }, {});
     }


      // 2. Fetch News (CryptoPanic)
      try {
        const newsRes = await axios.get(`https://cryptopanic.com/api/developer/v2/posts/`, {
          params: {
            auth_token: process.env.CRYPTOPANIC_API_KEY,
            kind: 'news',
            filter: 'important',
            public: 'true' 
          }
        });
        if (newsRes.data && newsRes.data.results) {
          dashboardData.news = newsRes.data.results.slice(0, 5);
        }
      } catch (e) { console.error("News API Failed:", e.message); }

      // 3. Fetch AI Insight (OpenRouter)
      try {
        const aiRes = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
          model: "mistralai/mistral-7b-instruct:free",
          messages: [{ role: "user", content: `Give a crypto insight for a ${prefs.investorType} interested in ${prefs.assets.join(', ')}.` }]
        }, {
          headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` }
        });
        let rawText = aiRes.data.choices[0].message.content;
        const cleanedText = rawText.replace(/<\/?s>/g, '').trim();
        dashboardData.aiInsight = cleanedText;

      } catch (e) { console.error("AI API Failed:", e.message); }

      // 4. Fetch Meme (Reddit)
      try {
        const memeRes = await axios.get('https://www.reddit.com/r/cryptocurrencymemes/top.json?limit=5');
        const memes = memeRes.data.data.children;
        dashboardData.meme = memes[Math.floor(Math.random() * memes.length)].data.url;
      } catch (e) { console.error("Meme API Failed:", e.message); }

      res.json(dashboardData);
  });
};