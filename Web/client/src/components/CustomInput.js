import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import './CustomInput.css';

function CustomInput() {
  const [url, setUrl] = useState('');
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8087/summarize_article', { url }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response); // Log the response from the server
      setLoading(false);

      const { article } = response.data;
      setArticle(article);
      setError(null);
    } catch (err) {
      console.error(err);
      setLoading(false);

      setError('Failed to fetch article summary');
      setArticle(null);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Article Summarizer</h1>
      <div className="custom-input-container">
        <form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              placeholder="Enter article URL"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
            <Button variant="primary" type="submit">
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                'Summarize'
              )}
            </Button>
          </InputGroup>
        </form>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {article && (
        <div className="article-container">
          {article.top_image && (
            <div className="article-image-container">
              <img src={article.top_image} alt="Article" />
            </div>
          )}
          <div className="article-text-container">
            <h2 className="article-title">{article.title}</h2>
            <p className="article-summary">{article.text}</p>
            <div className="article-reference-container">
              <a href={article.url} target="_blank" rel="noreferrer">
                <Button variant="secondary">Read Full Article</Button>
              </a>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default CustomInput;
