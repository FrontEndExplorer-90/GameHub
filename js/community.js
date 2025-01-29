// ======= Variables =======
const sendButton = document.querySelector('.send-btn');
const chatInput = document.querySelector('.chat-input');
const chatBox = document.querySelector('.chat-box');
const pollItems = document.querySelectorAll('.poll-item');
const voteButton = document.querySelector('.vote-btn');
const joinButton = document.querySelector('.view-all-btn');

// ======= Functions =======

// Calender with Events

document.addEventListener('DOMContentLoaded', () => {
    const events = {
        '2025-01-20': ['Community Game Night at 7 PM'],
        '2025-01-25': ['Space Race Championship Finals'],
        '2025-01-27': ['Developer AMA at 5 PM'],
    };

    const calendarContainer = document.getElementById('calendar');
    const monthYearDisplay = document.getElementById('month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let currentMonth = new Date().getMonth(); 
    let currentYear = new Date().getFullYear(); 

    // Funksjon for å generere kalenderen for en måned
    function generateCalendar(year, month) {
        calendarContainer.innerHTML = ''; 

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const daysInMonth = lastDay.getDate();
        const startDay = (firstDay.getDay() + 6) % 7; 

        // Oppdater månedsnavn og år
        monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

        // Legg til tomme ruter før den første dagen i måneden
        for (let i = 0; i < startDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day');
            calendarContainer.appendChild(emptyCell);
        }

        // Generer dager i måneden
        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = day;

            // Hvis det er et arrangement på denne datoen
            if (events[dateKey]) {
                dayElement.classList.add('event');

                // Legg til event-informasjon som vises ved hover
                const eventDetails = document.createElement('div');
                eventDetails.classList.add('event-details');
                eventDetails.textContent = events[dateKey].join(', ');
                dayElement.appendChild(eventDetails);
            }

            calendarContainer.appendChild(dayElement);
        }
    }

    // Funksjon for å gå til forrige måned
    function prevMonth() {
        currentMonth -= 1;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear -= 1;
        }
        generateCalendar(currentYear, currentMonth);
    }

    // Funksjon for å gå til neste måned
    function nextMonth() {
        currentMonth += 1;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear += 1;
        }
        generateCalendar(currentYear, currentMonth);
    }

    // Event Listeners for navigering
    prevMonthButton.addEventListener('click', prevMonth);
    nextMonthButton.addEventListener('click', nextMonth);

    // Generer kalenderen for inneværende måned
    generateCalendar(currentYear, currentMonth);
});

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

// Simulate incoming messages in live chat
function simulateIncomingMessages() {
    const simulatedMessages = [
        'Player123: Anyone up for a match?',
        'GameMaster: New event starting in 10 minutes!',
        'GamerGirl89: Just reached level 50!',
        'SpeedRacer: Does anyone have tips for the new map?',
        'NightWolf: This community is awesome!'
    ];

    let index = 0;
    setInterval(() => {
        if (index < simulatedMessages.length) {
            const newMessage = document.createElement('p');
            newMessage.textContent = simulatedMessages[index];
            chatBox.appendChild(newMessage);
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
            index++;
        }
    }, 5000); // Send a new message every 5 seconds
}

// Highlight leaderboard
function highlightLeaderboard() {
    const leaderboardItems = document.querySelectorAll('.leaderboard li');
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
        // Save vote in localStorage
        localStorage.setItem('pollVote', selectedOption);
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

// Join the community
function joinCommunity() {
    // Save membership status in localStorage
    localStorage.setItem('isMember', true);
    alert('Welcome to the GameHub Community! Your membership has been activated.');
}


// Start fetch ved siden lastes
document.addEventListener('DOMContentLoaded', fetchLatestPosts);


// Load saved poll vote
function loadSavedPollVote() {
    const savedVote = localStorage.getItem('pollVote');
    if (savedVote) {
        pollItems.forEach((item) => {
            if (item.textContent === savedVote) {
                item.classList.add('selected');
            }
        });
    }
}

// Load membership status
function loadMembershipStatus() {
    const isMember = localStorage.getItem('isMember');
    if (isMember) {
        joinButton.textContent = 'You’re a Member!';
        joinButton.disabled = true; // Disable button if already a member
    }
}

// ======= Event Listeners =======
document.addEventListener('DOMContentLoaded', () => {
    // Highlight leaderboard
    highlightLeaderboard();

    // Fetch latest posts
    fetchLatestPosts();

    // Load saved poll vote
    loadSavedPollVote();

    // Load membership status
    loadMembershipStatus();

    // Send chat messages
    sendButton.addEventListener('click', sendMessage);

    // Simulate incoming messages
    simulateIncomingMessages();

    // Handle poll voting
    voteButton.addEventListener('click', votePoll);

    // Select poll option
    pollItems.forEach((item) => {
        item.addEventListener('click', selectPollOption);
    });

    // Handle "Join Now" button click
    joinButton.addEventListener('click', joinCommunity);
});
