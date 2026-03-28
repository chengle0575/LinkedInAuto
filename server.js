const express = require("express");
const fs = require("fs");
const path = require("path");

// Load .env manually (no extra dependency)
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx > 0) {
      process.env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
    }
  }
}

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get("/api/config", (req, res) => {
  res.json({ apiKey: process.env.TINYFISH_API_KEY || "" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
