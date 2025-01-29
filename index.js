const express = require("express");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 8080;
const JWT_SECRET = "something_secret";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Users",
  password: "0000",
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "public", "login.html")));

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
        [username, email, hashedPassword]
      );
      res.redirect("/login");
    } catch (err) {
      res.send(`Error: ${err.message}`);
    }
  });

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      const user = result.rows[0];
  
      if (!user) return res.send("User not found! <a href='/'>Register here</a>");
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.send("Incorrect password! <a href='/login'>Try again</a>");
  
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
  
      res.redirect(`/welcome.html?username=${encodeURIComponent(user.username)}`);
    } catch (err) {
      res.send(`Error: ${err.message}`);
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
