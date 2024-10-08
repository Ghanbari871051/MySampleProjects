import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteMachine = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  
  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data.content);
      setAuthor(response.data.author);
    } catch (error) {
      console.error('Error fetching the quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleNewQuote = () => {
    fetchQuote();
  };

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div id="quote-box" className="quote-box" style={{ textAlign: 'center' }}>
      <p id="text">{quote}</p>
      <p id="author">{author}</p>
      <button id="new-quote" onClick={handleNewQuote}>New Quote</button>
      <a 
        id="tweet-quote" 
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Tweet Quote
      </a>
    </div>
  );
};

export default QuoteMachine;
