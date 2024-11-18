//FRONTEND


document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch and display random quote
    const fetchRandomQuote = () => {
      // Fetch from Quotable API (or another API if preferred)
      fetch('https://api.quotable.io/random')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch quote');
          }
          return response.json();
        })
        .then((data) => {
          // Update the quote and author in the DOM
          const quoteText = data.content; // Quote text
          const authorName = data.author; // Author's name
  
          document.getElementById('quote').textContent = `"${quoteText}"`;
          document.getElementById('quote-author').textContent = `- ${authorName}`;
        })
        .catch((error) => {
          console.error('Error fetching quote:', error);
          // Display error message if fetch fails
          document.getElementById('quote').textContent = 'Error loading quote.';
          document.getElementById('quote-author').textContent = '';
        });
    };
  
    // Fetch quote when the page loads
    fetchRandomQuote();
  });
  