// src/policy/policy.jsx
import React from 'react';
import './policy.css'; // Import any CSS if applicable

const Policy = () => {
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  // Fetch random quote from the API on initial load
  React.useEffect(() => {
    fetch('https://quote.cs260.click')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.quote);
        setQuoteAuthor(data.author);
      })
      .catch((error) => {
        console.error('Error fetching quote:', error);
        setQuote('Oops, something went wrong...');
        setQuoteAuthor('unknown');
      });
  }, []);

  return (
    <main className='container-fluid bg-secondary text-center'>
      <header>
        <h1>Cocojewel</h1>
        <h3>Waterproof Jewelry Policy</h3>
      </header>

      <section>
        <h4>Enjoy Your Beach Days with Confidence!</h4>
        <p>
          At Cocojewel, we create jewelry designed to keep up with your beach days and poolside fun.
          Our water-resistant pieces can handle splashes, but a little care goes a long way in keeping them looking great.
        </p>
      </section>

      <section>
        <h4>Quick Tips for Keeping Your Jewelry in Top Shape:</h4>
        <p>Saltwater & Chlorine: A quick rinse with fresh water after swimming helps prevent any damage.</p>
        <p>Chemicals: Avoid lotions, sunscreen, and perfumes – they can dull the shine.</p>
        <p>Storage: When you're not wearing it, keep your jewelry dry and in a safe spot.</p>
      </section>

      <section>
        <p>
          While our jewelry is water-resistant, remember that constant exposure to water (especially saltwater) can affect its appearance over time.
        </p>
        <p>Enjoy your pieces, but treat them with care to keep them shining bright!</p>
      </section>

      {/* Quote Box */}
      <div className="quote-box bg-primary text-white mt-5 p-4">
        <p className="quote">{quote}</p>
        <p className="author">- {quoteAuthor}</p>
      </div>
    </main>
  );
}

export default Policy;
