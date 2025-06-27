import React from 'react';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h2>URL Shortener</h2>
      <UrlForm />
      <UrlList />
    </div>
  );
}
