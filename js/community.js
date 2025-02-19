// ======= Variabler hentet fra DOM =======
const sendButton = document.querySelector('.send-btn');
const chatInput = document.getElementById('chat-input');  
const chatBox = document.getElementById("chat-box");
const pollItems = document.querySelectorAll('.poll-item');
const voteButton = document.querySelector('.vote-btn');
const joinButton = document.querySelector('.view-all-btn'); 
const membershipSection = document.querySelector('.membership');
const eventDetailsBox = document.getElementById('event-details-box');
const eventText = document.getElementById('event-text');
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

const messages = [
    'Player123: Anyone up for a match?',
    'GameMaster: New event starting in 10 minutes!',
    'GamerGirl89: Just reached level 50!',
    'SpeedRacer: Does anyone have tips for the new map?',
    'NightWolf: This community is awesome!'
];

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
    } else if (joinButton) {
        joinButton.addEventListener("click", () => {
            window.location.href = "membership.html";
        });
    }

    setupCalendar();
    setupChat();
    pollItems.forEach(item => {
        item.addEventListener('click', () => {
            pollItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
        });
    });

    if (voteButton) {
        voteButton.addEventListener('click', () => {
            const selected = document.querySelector('.poll-item.selected');
            if (selected) {
                alert(`Thank you for voting for: ${selected.textContent}`);
            } else {
                alert('Please select an option before voting.');
            }
        });
    }
});

// ======= Funksjon: Oppsett av kalender =======
function setupCalendar() {
    const events = {
        '2025-02-20': ['Our monthly "Community Game Night" starts at 7 PM'],
        '2025-02-25': ['Dont miss the "Space Race Championship Finals"'],
        '2025-02-27': ['Developer AMA at 5 PM'],
        '2025-03-08': ['We celebrate International Womens day with new releases'],
        '2025-03-17': ['Our 1st monthly "Monday Funday" with lots of challenges and free minigames for the next 24h'],
        '2025-03-30': ['Summertime madness event starts at 4PM (lasting the whole week)'],
    };

    const calendarContainer = document.getElementById('calendar');
    if (!calendarContainer) return; 

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
}

// ======= Funksjon: Oppsett av chat =======
function setupChat() {
    simulateIncomingMessages();
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
    if (chatInput) {
        chatInput.addEventListener('keypress', (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                sendMessage();
            }
        });
    }
}

function simulateIncomingMessages() {
    const messages = [
        'Player123: Anyone up for a match?',
        'GameMaster: New event starting in 10 minutes!',
        'GamerGirl89: Just reached level 50!',
        'SpeedRacer: Does anyone have tips for the new map?',
        'NightWolf: This community is awesome!'
    ];
    let index = 0;

    const interval = setInterval(() => {
        if (index < messages.length) {
            const newMessage = document.createElement("p");
            newMessage.textContent = messages[index];
            chatBox.appendChild(newMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
            index++;
        } else {
            clearInterval(interval);
        }
    }, 5000);
}

function sendMessage() {
    if (!chatInput) return;
    const message = chatInput.value.trim();
    if (!message) return; 
    const newMessage = document.createElement('p');
    newMessage.textContent = `You: ${message}`;
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
    chatInput.value = '';
}
