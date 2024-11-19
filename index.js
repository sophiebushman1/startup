//FRONTEND

document.addEventListener('DOMContentLoaded', () => {
  // Function to fetch and display a random quote
  const fetchRandomQuote = () => {
    // Fetch from the JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch quote');
        }
        return response.json();
      })
      .then((data) => {
        // Update the quote and author in the DOM
        const quoteText = data.title; // This will use the "title" from the todo as the quote
        const authorName = "Unknown"; // Since there's no author in this API, we'll use "Unknown"

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
