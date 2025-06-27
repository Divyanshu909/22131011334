import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const mockClickData = () => {
  const locations = ['Delhi, India', 'Mumbai, India', 'Pune, India'];
  const sources = ['Facebook', 'Twitter', 'LinkedIn', 'Direct'];

  const clicks = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
    timestamp: new Date(Date.now() - Math.random() * 10000000).toISOString(),
    source: sources[Math.floor(Math.random() * sources.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
  }));

  return clicks;
};

const Stats = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('shortened');
    if (stored) {
      const parsed = JSON.parse(stored);
      const withStats = parsed.map((item) => ({
        ...item,
        clicks: mockClickData(),
      }));
      setUrls(withStats);
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        URL Shortener Statistics
      </Typography>
      {urls.length === 0 ? (
        <Typography>No URLs found.</Typography>
      ) : (
        urls.map((url, idx) => (
          <Paper key={idx} style={{ padding: 15, marginBottom: 20 }}>
            <Typography variant="subtitle1">
              Short URL: http://localhost:3000/{url.shortcode}
            </Typography>
            <Typography>Original URL: {url.longUrl}</Typography>
            <Typography>Total Clicks: {url.clicks.length}</Typography>
            <Typography variant="subtitle2" gutterBottom>
              Click Details:
            </Typography>
            <List dense>
              {url.clicks.map((click, i) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={`Timestamp: ${new Date(click.timestamp).toLocaleString()}`}
                    secondary={`Source: ${click.source}, Location: ${click.location}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        ))
      )}
    </div>
  );
};

export default Stats;
