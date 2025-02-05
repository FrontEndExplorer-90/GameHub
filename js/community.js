// ======= Variables =======
const sendButton = document.querySelector('.send-btn');
const chatInput = document.querySelector('.chat-input');
const chatBox = document.getElementById("chat-box");
const pollItems = document.querySelectorAll('.poll-item');
const voteButton = document.querySelector('.vote-btn');
const joinButton = document.querySelector('.view-all-btn'); 
const membershipSection = document.querySelector('.membership');
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// ======= Functions =======

document.addEventListener("DOMContentLoaded", () => {
   
    if (loggedInUser) {
        membershipSection.innerHTML = `
            <h2 class="section-title">Hi, ${loggedInUser.username}!</h2>
            <p>Welcome back, enjoy your stay.</p>
            <button class="logout-btn">Logout</button>
        `;
    

        
        document.querySelector(".logout-btn").addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            location.reload();
        });

    } else {
        
        joinButton.addEventListener("click", () => {
            window.location.href = "membership.html";
        });
    }
});


// Calendar with Events
document.addEventListener('DOMContentLoaded', () => {
    const events = {
        '2025-02-20': ['Community Game Night at 7 PM'],
        '2025-02-25': ['Space Race Championship Finals'],
        '2025-02-27': ['Developer AMA at 5 PM'],
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

    function generateCalendar(year, month) {
        calendarContainer.innerHTML = ''; 

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const daysInMonth = lastDay.getDate();
        const startDay = (firstDay.getDay() + 6) % 7; 

        monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

        for (let i = 0; i < startDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day');
            calendarContainer.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = day;

            if (events[dateKey]) {
                dayElement.classList.add('event');
                const eventDetails = document.createElement('div');
                eventDetails.classList.add('event-details');
                eventDetails.textContent = events[dateKey].join(', ');
                dayElement.appendChild(eventDetails);
            }

            calendarContainer.appendChild(dayElement);
        }
    }

    function prevMonth() {
        currentMonth -= 1;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear -= 1;
        }
        generateCalendar(currentYear, currentMonth);
    }

    function nextMonth() {
        currentMonth += 1;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear += 1;
        }
        generateCalendar(currentYear, currentMonth);
    }

    prevMonthButton.addEventListener('click', prevMonth);
    nextMonthButton.addEventListener('click', nextMonth);

    generateCalendar(currentYear, currentMonth);
});

// Add new message to chat box
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        const newMessage = document.createElement('p');
        newMessage.textContent = `You: ${message}`;
        chatBox.appendChild(newMessage);
        chatInput.value = ''; 
        chatBox.scrollTop = chatBox.scrollHeight; 

        //Debugging: Sjekk om meldingen faktisk legges til
        console.log("Current chat content:", chatBox.innerHTML);
    }
}

// Simulate incoming messages in live chat
function simulateIncomingMessages() {
    console.log("Live chat simulation started...");
    
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
            console.log(`Adding message: ${simulatedMessages[index]}`);
            
            const newMessage = document.createElement("p");
            newMessage.textContent = simulatedMessages[index];
            chatBox.appendChild(newMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
            
            index++;
        } else {
            console.log("No more messages left to display.");
        }
    }, 5000);
}


document.addEventListener("DOMContentLoaded", simulateIncomingMessages);


// Highlight leaderboard
function highlightLeaderboard() {
    const leaderboardItems = document.querySelectorAll('.leaderboard li');
    leaderboardItems.forEach((item, index) => {
        if (index === 0) item.style.color = '#ffaa00';
        if (index === 1) item.style.color = '#c0c0c0';
        if (index === 2) item.style.color = '#cd7f32';
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
        localStorage.setItem('pollVote', selectedOption);
        alert(`Thank you for voting! You selected: ${selectedOption}`);
    } else {
        alert('Please select an option before voting.');
    }
}

// Select poll option
function selectPollOption(event) {
    pollItems.forEach((item) => item.classList.remove('selected'));
    event.target.classList.add('selected');
}

// Join the community
function joinCommunity() {
    localStorage.setItem('isMember', true);
    alert('Welcome to the GameHub Community! Your membership has been activated.');
}

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
    if (isMember && joinButton) {
        joinButton.textContent = 'You’re a Member!';
        joinButton.disabled = true;
    }
}

// ======= Event Listeners =======
document.addEventListener('DOMContentLoaded', () => {
    highlightLeaderboard();
    fetchLatestPosts();
    loadSavedPollVote();
    loadMembershipStatus();

    sendButton.addEventListener('click', sendMessage);
    simulateIncomingMessages();
    voteButton.addEventListener('click', votePoll);

    pollItems.forEach((item) => {
        item.addEventListener('click', selectPollOption);
    });

    if (joinButton) {
        joinButton.addEventListener('click', () => {
            window.location.href = "membership.html";
        });
    }
});

// Handle user login & membership display
document.addEventListener("DOMContentLoaded", () => {
    const membershipSection = document.querySelector(".membership");
    const membershipTitle = document.getElementById("membership-title");
    const membershipText = document.getElementById("membership-text");
    const membershipBtn = document.getElementById("membership-btn");

    const user = JSON.parse(localStorage.getItem("gamehubUser"));

    if (user) {
        membershipTitle.textContent = `Welcome, ${user.username}!`;
        membershipText.textContent = "Check your inbox and enjoy member benefits.";
        membershipBtn.textContent = "Logout";
        membershipBtn.classList.add("logout-btn");

        membershipBtn.addEventListener("click", () => {
            localStorage.removeItem("gamehubUser");
            location.reload();
        });
    } else {
        membershipBtn.addEventListener("click", () => {
            window.location.href = "membership.html";
        });
    }
});
