document.addEventListener("DOMContentLoaded", () => {
    const username = document.getElementById("username");
    const profileImg = document.getElementById("profile-img");
    const points = document.getElementById("points");
    const orderList = document.getElementById("orders");
    const blogList = document.getElementById("blogs");
    const friendsList = document.getElementById("friends");

    // 🎯 Hent brukerinfo fra localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const savedProfileImg = localStorage.getItem("profileImage");
    const savedPoints = localStorage.getItem("gameHubPoints") || 0;
    const savedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    const savedBlogs = JSON.parse(localStorage.getItem("userBlogs")) || [];
    const savedFriends = JSON.parse(localStorage.getItem("friendsList")) || [];

    if (loggedInUser) {
        username.textContent = loggedInUser.username;
    }

    if (savedProfileImg) {
        profileImg.src = savedProfileImg;
    }

    points.textContent = savedPoints;

    // 🎯 Fyll ut ordrehistorikk
    savedOrders.forEach(order => {
        const li = document.createElement("li");
        li.textContent = `${order.title} - ${order.date}`;
        orderList.appendChild(li);
    });

    // 🎯 Fyll ut blogginnlegg
    savedBlogs.forEach(blog => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="blogpost.html?id=${blog.id}">${blog.title}</a>`;
        blogList.appendChild(li);
    });

    // 🎯 Fyll ut venneliste
    savedFriends.forEach(friend => {
        const li = document.createElement("li");
        li.textContent = friend;
        friendsList.appendChild(li);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("loggedInUser") || "Guest";
    const points = localStorage.getItem("gameHubPoints") || 0;

    document.getElementById("username").textContent = username;
    document.getElementById("points").textContent = points;

    // Dummy data for order history
    const orderHistory = [
        { title: "Cyberpunk", date: "Jan 15, 2025" },
        { title: "Space War", date: "Dec 20, 2024" },
        { title: "Boxer", date: "Nov 10, 2024" }
    ];
    
    const orderList = document.getElementById("order-history");
    orderHistory.forEach(order => {
        const li = document.createElement("li");
        li.textContent = `${order.title} - Purchased on ${order.date}`;
        orderList.appendChild(li);
    });

    // Dummy data for blog posts
    const blogPosts = [
        { title: "How to master Space War", date: "Feb 2, 2025" },
        { title: "Best Racing Games of 2024", date: "Jan 10, 2025" }
    ];
    
    const blogList = document.getElementById("blog-posts");
    blogPosts.forEach(post => {
        const li = document.createElement("li");
        li.textContent = `${post.title} - Posted on ${post.date}`;
        blogList.appendChild(li);
    });

    // Dummy data for friends
    const friends = [
        { name: "GamerX", avatar: "images/friend1.png" },
        { name: "ShadowNinja", avatar: "images/friend2.png" }
    ];
    
    const friendsList = document.getElementById("friends-list");
    friends.forEach(friend => {
        const li = document.createElement("li");
        li.innerHTML = `<img src="${friend.avatar}" alt="${friend.name}" class="friend-avatar"> ${friend.name}`;
        friendsList.appendChild(li);
    });
});