const express = require('express');
const app = express();

// Set the server's time zone to UTC
process.env.TZ = 'UTC';

// Define a route to handle GET requests
app.get('/endpoint', (req, res) => {
  // Get query parameters
  const slackName = req.query.slack_name || 'david_ongaro';
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const utcTime = new Date().toISOString();
  const track = req.query.track || 'backend';
  const githubFileUrl = req.query.github_file_url || '';
  const githubRepoUrl = req.query.github_repo_url || '';

  // Calculate UTC offset
  const currentTime = new Date();
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
