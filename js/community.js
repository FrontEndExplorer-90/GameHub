// ======= Variables =======
const sendButton = document.querySelector('.send-btn');
const chatInput = document.querySelector('.chat-input');
const chatBox = document.getElementById("chat-box");
const pollItems = document.querySelectorAll('.poll-item');
const voteButton = document.querySelector('.vote-btn');
const joinButton = document.querySelector('.view-all-btn'); 
const membershipSection = document.querySelector('.membership');
const eventDetailsBox = document.getElementById('event-details-box');
const eventText = document.getElementById('event-text');
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

// ======= Functions =======

// Oppdater medlemskapsseksjonen basert på login-status
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

// Kalender med eventer
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
                dayElement.dataset.event = events[dateKey].join(', ');
                dayElement.addEventListener('mouseenter', () => {
                    eventText.textContent = events[dateKey].join(', ');
                    eventDetailsBox.classList.add('visible');
                });
                dayElement.addEventListener('mouseleave', () => {
                    eventDetailsBox.classList.remove('visible');
                    eventText.textContent = 'Hover over a day with an event to see details!';
                });
            }

            calendarContainer.appendChild(dayElement);
        }
    }

    prevMonthButton.addEventListener('click', () => {
        currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
        generateCalendar(currentYear, currentMonth);
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
        generateCalendar(currentYear, currentMonth);
    });

    generateCalendar(currentYear, currentMonth);
});

// Chat-funksjonalitet
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        const newMessage = document.createElement('p');
        newMessage.textContent = `You: ${message}`;
        chatBox.appendChild(newMessage);
        chatInput.value = ''; 
        chatBox.scrollTop = chatBox.scrollHeight; 
    }
}

sendButton.addEventListener('click', sendMessage);

// Simuler innkommende meldinger
function simulateIncomingMessages() {
    const messages = [
        'Player123: Anyone up for a match?',
        'GameMaster: New event starting in 10 minutes!',
        'GamerGirl89: Just reached level 50!',
        'SpeedRacer: Does anyone have tips for the new map?',
        'NightWolf: This community is awesome!'
    ];

    let index = 0;
    setInterval(() => {
        if (index < messages.length) {
            const newMessage = document.createElement("p");
            newMessage.textContent = messages[index];
            chatBox.appendChild(newMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
            index++;
        }
    }, 5000);
}

simulateIncomingMessages();

// Håndtere poll-voting
pollItems.forEach(item => {
    item.addEventListener('click', () => {
        pollItems.forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
    });
});

voteButton.addEventListener('click', () => {
    const selected = document.querySelector('.poll-item.selected');
    if (selected) {
        alert(`Thank you for voting for: ${selected.textContent}`);
    } else {
        alert('Please select an option before voting.');
    }
});
