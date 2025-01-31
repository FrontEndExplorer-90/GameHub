document.addEventListener("DOMContentLoaded", () => {
    console.log("📌 MyGameHub JS loaded");

    // 🎯 Hent HTML-elementene
    const usernameElem = document.getElementById("username");
    const profileImgElem = document.getElementById("profile-img");
    const pointsElem = document.getElementById("points");
    const orderListElem = document.getElementById("order-history");
    const blogListElem = document.getElementById("blog-posts");
    const friendsListElem = document.getElementById("friends-list");

    // 🎯 Hent brukerdata fra localStorage (og håndter feil)
    let loggedInUser = { username: "Guest" }; // Standardverdi hvis ingen er logget inn

    try {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            loggedInUser = JSON.parse(storedUser);
            if (!loggedInUser.username) throw new Error("Username missing in storage");
        }
    } catch (error) {
        console.error("🚨 Feil ved henting av loggedInUser fra localStorage", error);
        localStorage.removeItem("loggedInUser"); // Fjern korrupt data
    }

    // 🎯 Oppdater brukerprofil
    usernameElem.textContent = loggedInUser.username || "Guest";
    profileImgElem.src = localStorage.getItem("profileImage") || "images/foxprofilpicture.webp";
    pointsElem.textContent = localStorage.getItem("gameHubPoints") || 0;

    console.log(`👤 Logged in as: ${loggedInUser.username}`);

    // 🎯 Dummydata for ordre, blogginnlegg og venner
    const orderHistory = [
        { title: "Cyberpunk", date: "Jan 15, 2025" },
        { title: "Space War", date: "Dec 20, 2024" },
        { title: "Boxer", date: "Nov 10, 2024" }
    ];
    orderHistory.forEach(order => {
        const li = document.createElement("li");
        li.textContent = `${order.title} - Purchased on ${order.date}`;
        orderListElem.appendChild(li);
    });

    const blogPosts = [
        { title: "How to master Space War", date: "Feb 2, 2025" },
        { title: "Best Racing Games of 2024", date: "Jan 10, 2025" }
    ];
    blogPosts.forEach(post => {
        const li = document.createElement("li");
        li.textContent = `${post.title} - Posted on ${post.date}`;
        blogListElem.appendChild(li);
    });

    const friends = [
        { name: "ShadowNinja", avatar: "images/foxprofilpicture.webp" },
        { name: "GamerX", avatar: "images/womenglowingimg.webp" }
    ];
    friends.forEach(friend => {
        const li = document.createElement("li");
        li.innerHTML = `<img src="${friend.avatar}" alt="${friend.name}" class="friend-avatar"> ${friend.name}`;
        friendsListElem.appendChild(li);
    });
});
