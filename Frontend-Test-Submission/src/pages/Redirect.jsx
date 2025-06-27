import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, CircularProgress, Box } from '@mui/material';

const Redirect = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('shortened');
    if (!stored) {
      navigate('/');
      return;
    }

    const urls = JSON.parse(stored);
    const matched = urls.find((u) => u.shortcode === shortcode);

    if (!matched) {
      alert('Short URL not found!');
      navigate('/');
    } else {
      const isExpired = new Date(matched.expiresAt) < new Date();
      if (isExpired) {
        alert('This link has expired.');
        navigate('/');
      } else {
        // Simulate logging click stats here
        setTimeout(() => {
          window.location.href = matched.longUrl;
        }, 1500); // wait briefly before redirect
      }
    }
  }, [shortcode, navigate]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
      <CircularProgress />
      <Typography variant="h6" mt={2}>
        Redirecting...
      </Typography>
    </Box>
  );
};

export default Redirect;
