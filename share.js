// share.js
document.addEventListener('DOMContentLoaded', () => {
    const shareForm = document.getElementById('share-form');
    const shareNumberSpan = document.getElementById('share-number');

    // Initialize WebSocket
    const ws = new WebSocket('ws://your-websocket-server-url');
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        shareNumberSpan.innerText = data.shareCount; // Update share count
    };

    // Handle cart sharing
    shareForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const friendEmail = document.getElementById('friend-email').value;
        if (friendEmail) {
            // Simulate sending cart share request
            fetch('/share', {
                method: 'POST',
                body: JSON.stringify({ email: friendEmail }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => response.json())
                .then(data => {
                    alert('Cart shared successfully!');
                    // Optionally reset the form
                    shareForm.reset();
                })
                .catch(error => {
                    console.error('Error sharing cart:', error);
                });
        }
    });
});
