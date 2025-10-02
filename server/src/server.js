const express = require("express");
const app = express();
const db = require("./db");
const bcrypt = require("bcrypt");
const cors = require("cors");

// Cors omdat ik dit lokaal develop, anders kan ik de api niet aanroepen
app.use(cors());
app.use(express.json());

// Route voor registreren van account
app.post("/register", async (req, res) => {

  // Haal de username en password uit de request
  const { username, password } = req.body;

  // Check of het niet NULL is
  if (!username || !password) {
    return res.json({ success: false, message: "Fill in all fields" });
  }

  // Check of de user al bestaat
  const checkQuery = "SELECT * FROM users WHERE username = ?";
  db.execute(checkQuery, [username], async (err, results) => {
    if (err) return res.json({ success: false, message: "Database ran into an error" });

    // Check response
    if (results.length > 0) {
            return res.json({ success: false, message: "Name is already taken !" });
        }

        // Hash het wachtwoord
        const hashedPassword = await bcrypt.hash(password, 10);

        // Push de nieuwe user in de database
        const query = "INSERT INTO users (username, password) VALUES (?, ?)";
        db.execute(query, [username, hashedPassword], (err, results) => {
          if (err) return res.json({ success: false, message: "Database ran into an error" });
          res.json({ success: true, message: "Registration success" });
        });

  });
})

// Route voor inloggen op account
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check of het niet NULL is
  if (!username || !password) {
    return res.json({ success: false, message: "Fill in all fields." });
  }

  // Zoek user in de database
  const query = "SELECT * FROM users WHERE username = ?";
  db.execute(query, [username], async (err, results) => {
    if (err) return res.json({ success: false, message: "Database ran into an error"});

    // Check de lengte van de response, leeg = niet gevonden
    if (results.length === 0) {
      return res.json({ success: false, message: "User not found." });
    }

    const user = results[0];

    // Vergelijk wachtwoord hashes
    const match = await bcrypt.compare(password, user.password);
    if (!match)
    {
      return res.json({ success: false, message: "Incorrect password." });
    }

    res.json({ success: true, message: "Login Succesful" });
  });
})

// laat de server draaien op poort 3000
app.listen(3000, () => {
    console.log("Server running on port 3000");
});