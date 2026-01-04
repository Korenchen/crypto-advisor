const db = require('../db/database');

exports.submitVote = (req, res) => {
  const userId = req.user.id; 
  const { section, vote } = req.body; 

  const query = `INSERT INTO feedback (userId, section, vote) VALUES (?, ?, ?)`;
  
  db.run(query, [userId, section, vote], function(err) {
    if (err) return res.status(500).json({ error: "Failed to save vote" });
    res.json({ message: "Vote recorded! This helps improve your AI insights." });
  });
};