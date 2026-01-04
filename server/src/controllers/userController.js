const db = require('../db/database');

exports.updatePreferences = (req, res) => {
  const userId = req.user.id; 
  const { assets, investorType, contentType } = req.body;

  const preferences = JSON.stringify({ assets, investorType, contentType });

  const query = `UPDATE users SET preferences = ? WHERE id = ?`;
  
  db.run(query, [preferences, userId], function(err) {
    if (err) return res.status(500).json({ error: "Failed to save preferences" });
    res.json({ message: "Preferences saved successfully!" });
  });
};