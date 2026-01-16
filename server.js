const express = require("express");
const { exec } = require("child_process");

const app = express();

app.get("/get", (req, res) => {
  const url = req.query.url;
  if (!url) return res.json({ error: "no url" });

  exec(`./yt-dlp -f best -g "${url}"`, (err, stdout) => {
    if (err) return res.json({ error: "failed" });

    res.json({ download: stdout.trim() });
  });
});

app.listen(process.env.PORT || 3000);
