import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

const UrlForm = () => {
  const [urlInputs, setUrlInputs] = useState([
    { longUrl: '', validity: '', shortcode: '' },
  ]);
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...urlInputs];
    updated[index][field] = value;
    setUrlInputs(updated);
  };

  const handleAddField = () => {
    if (urlInputs.length < 5) {
      setUrlInputs([...urlInputs, { longUrl: '', validity: '', shortcode: '' }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const results = urlInputs.map((input, idx) => {
      if (!input.longUrl.startsWith('http')) {
        alert(`Invalid URL at entry #${idx + 1}`);
        return null;
      }

      const validity = parseInt(input.validity) || 30;
      const shortcode = input.shortcode || Math.random().toString(36).substr(2, 5);
      const createdAt = new Date();
      const expiresAt = new Date(Date.now() + validity * 60000);

      return {
        ...input,
        shortcode,
        validity,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
      };
    });

    if (!results.includes(null)) {
      setShortenedUrls(results);
      localStorage.setItem('shortened', JSON.stringify(results)); // for stats page
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
      <Typography variant="h6" gutterBottom>
        Enter up to 5 URLs to shorten
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {urlInputs.map((input, index) => (
            <Grid container item spacing={1} key={index}>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Long URL"
                  fullWidth
                  required
                  value={input.longUrl}
                  onChange={(e) => handleChange(index, 'longUrl', e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Validity (mins)"
                  fullWidth
                  type="number"
                  value={input.validity}
                  onChange={(e) => handleChange(index, 'validity', e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  label="Custom Shortcode (optional)"
                  fullWidth
                  value={input.shortcode}
                  onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
                />
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="outlined" onClick={handleAddField} disabled={urlInputs.length >= 5}>
              + Add Another URL
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Shorten URLs
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UrlForm;
