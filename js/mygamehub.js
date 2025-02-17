document.addEventListener("DOMContentLoaded", () => {
    const usernameElem = document.getElementById("username");
    const profileImgElem = document.getElementById("profile-pic");
    const pointsElem = document.getElementById("points");
    const orderListElem = document.getElementById("order-history");
    const blogListElem = document.getElementById("blog-posts");
    const friendsListElem = document.getElementById("friends-list");

    let loggedInUser = { username: "Guest" };

    try {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            loggedInUser = JSON.parse(storedUser);
            if (!loggedInUser.username) {
                localStorage.removeItem("loggedInUser");
                loggedInUser = { username: "Guest" };
            }
        }
    } catch (error) {
        localStorage.removeItem("loggedInUser");
        loggedInUser = { username: "Guest" };
    }

    if (usernameElem) {
        usernameElem.textContent = loggedInUser.username || "Guest";
    }
    if (profileImgElem) {
        profileImgElem.src = localStorage.getItem("profileImage") || "images/foxprofilpicture.webp";
    }
    if (pointsElem) {
        pointsElem.textContent = localStorage.getItem("gameHubPoints") || 0;
    }

    const orderHistory = [
        { title: "Cyberpunk", date: "Jan 15, 2025" },
        { title: "Space War", date: "Dec 20, 2024" },
        { title: "Boxer", date: "Nov 10, 2024" }
    ];
    orderHistory.forEach(order => {
        if (orderListElem) {
            const li = document.createElement("li");
            li.textContent = `${order.title} - Purchased on ${order.date}`;
            orderListElem.appendChild(li);
        }
    });

    const blogPosts = [
        { title: "How to master Space War", date: "Feb 2, 2025" },
        { title: "Best Racing Games of 2024", date: "Jan 10, 2025" }
    ];
    blogPosts.forEach(post => {
        if (blogListElem) {
            const li = document.createElement("li");
            li.textContent = `${post.title} - Posted on ${post.date}`;
            blogListElem.appendChild(li);
        }
    });

    const friends = [
        { name: "ShadowNinja", avatar: "images/foxprofilpicture.webp" },
        { name: "GamerX", avatar: "images/womenglowingimg.webp" }
    ];
    friends.forEach(friend => {
        if (friendsListElem) {
            const li = document.createElement("li");
            li.innerHTML = `<img src="${friend.avatar}" alt="${friend.name}" class="friend-avatar"> ${friend.name}`;
            friendsListElem.appendChild(li);
        }
    });
});
