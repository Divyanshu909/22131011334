import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const UrlList = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('shortened');
    if (stored) {
      setUrls(JSON.parse(stored));
    }
  }, []);

  if (urls.length === 0) return null;

  return (
    <Paper elevation={3} style={{ padding: 20 }}>
      <Typography variant="h6" gutterBottom>
        Shortened URLs
      </Typography>
      <List>
        {urls.map((url, idx) => (
          <div key={idx}>
            <ListItem>
              <ListItemText
                primary={`Short URL: http://localhost:3000/${url.shortcode}`}
                secondary={
                  <>
                    <div>Original: {url.longUrl}</div>
                    <div>Created: {new Date(url.createdAt).toLocaleString()}</div>
                    <div>Expires: {new Date(url.expiresAt).toLocaleString()}</div>
                  </>
                }
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Paper>
  );
};

export default UrlList;
