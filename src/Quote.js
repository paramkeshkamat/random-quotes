import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import TwitterIcon from "@material-ui/icons/Twitter";
import axios from "axios";
const url = "https://type.fit/api/quotes";

const Quote = () => {
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState({});
  const [loading, setLoading] = useState(true);

  const getQuotes = async () => {
    const response = await axios.get(url);
    setQuotes(response.data);
    setRandomQuote(response.data[0]);
    setLoading(false);
  };

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  };

  const tweetQuote = () => {
    const tweetPost = `https://twitter.com/intent/tweet?text=${randomQuote.text}`;
    window.open(tweetPost);
  };

  useEffect(() => {
    getQuotes();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Quote">
      <p className="text">
        <FormatQuoteIcon />
        {randomQuote.text}
      </p>
      <p className="author">- {randomQuote.author || "unknown"}</p>
      <div className="buttons">
        <button onClick={tweetQuote} className="twitter-intent btn">
          <TwitterIcon />
        </button>
        <button onClick={getRandomQuote} className="new-quote btn">
          new quote
        </button>
      </div>
    </div>
  );
};

export default Quote;
