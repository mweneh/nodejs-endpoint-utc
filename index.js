const express = require('express');
const app = express();

// Set the server's time zone to UTC
process.env.TZ = 'UTC';

// Define a route to handle GET requests
app.get('/api', (req, res) => {
  // Get query parameters
  const slackName = req.query.slack_name || 'david_ongaro';
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Format UTC time as "2023-09-11T19:01:58Z"
  const currentTime = new Date();
  const year = currentTime.getUTCFullYear();
  const month = String(currentTime.getUTCMonth() + 1).padStart(2, '0');
  const day = String(currentTime.getUTCDate()).padStart(2, '0');
  const hours = String(currentTime.getUTCHours()).padStart(2, '0');
  const minutes = String(currentTime.getUTCMinutes()).padStart(2, '0');
  const seconds = String(currentTime.getUTCSeconds()).padStart(2, '0');

  const utcTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

  const track = req.query.track || 'backend';
  const githubFileUrl = req.query.github_file_url || 'https://github.com/mweneh/nodejs-endpoint-utc/blob/main/index.js';
  const githubRepoUrl = req.query.github_repo_url || 'https://github.com/mweneh/nodejs-endpoint-utc';

  // Calculate UTC offset
  const utcOffset = currentTime.getTimezoneOffset() / 60;

  // Check if UTC offset is greater than -2 and less than 2
  if (utcOffset < -2 || utcOffset > 2) {
    return res.status(400).json({ error: 'Invalid UTC offset' });
  }

  // Send the JSON response
  res.status(200).json({
    slack_name: slackName,
    current_day: currentDay,
    utc_time: utcTime,
    track: track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: 200,
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
