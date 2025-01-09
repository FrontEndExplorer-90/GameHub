// ======= Variables =======
const sendButton = document.querySelector('.send-btn');
const chatInput = document.querySelector('.chat-input');
const chatBox = document.querySelector('.chat-box');
const pollItems = document.querySelectorAll('.poll-item');
const voteButton = document.querySelector('.vote-btn');
const joinButton = document.querySelector('.view-all-btn');

// Leaderboard highlights (Optional: Adjust colors dynamically)
const leaderboardItems = document.querySelectorAll('.leaderboard li');

// ======= Functions =======

// Add new message to chat box
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        const newMessage = document.createElement('p');
        newMessage.textContent = `You: ${message}`;
        chatBox.appendChild(newMessage);
        chatInput.value = ''; // Clear input
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
    }
}

// Highlight top-ranked players
function highlightLeaderboard() {
    leaderboardItems.forEach((item, index) => {
        if (index === 0) item.style.color = '#ffaa00'; // Gold for 1st place
        if (index === 1) item.style.color = '#c0c0c0'; // Silver for 2nd place
        if (index === 2) item.style.color = '#cd7f32'; // Bronze for 3rd place
    });
}

// Handle poll voting
function votePoll() {
    let selectedOption = null;
    pollItems.forEach((item) => {
        if (item.classList.contains('selected')) {
            selectedOption = item.textContent;
        }
    });

    if (selectedOption) {
        alert(`Thank you for voting! You selected: ${selectedOption}`);
    } else {
        alert('Please select an option before voting.');
    }
}

// Select poll option
function selectPollOption(event) {
    pollItems.forEach((item) => item.classList.remove('selected')); // Remove selection
    event.target.classList.add('selected'); // Add selection to clicked item
}

// Show feedback when joining
function joinCommunity() {
    alert('Welcome to the GameHub Community! Your membership has been activated.');
}

// ======= Event Listeners =======
document.addEventListener('DOMContentLoaded', () => {
    // Highlight the leaderboard
    highlightLeaderboard();

    // Send chat messages
    sendButton.addEventListener('click', sendMessage);

    // Handle poll voting
    voteButton.addEventListener('click', votePoll);

    // Select poll option
    pollItems.forEach((item) => {
        item.addEventListener('click', selectPollOption);
    });

    // Handle "Join Now" button click
    joinButton.addEventListener
