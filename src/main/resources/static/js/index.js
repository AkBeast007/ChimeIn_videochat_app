function loadAndDisplayUsers() {

    // Check if the user is connected
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (!connectedUser) {
        window.location = 'login.html';
        return;
    }

    // Display the logged-in user's name
    const loggedInUserNameElement = document.getElementById('loggedInUserName');
    if (loggedInUserNameElement && connectedUser.username) {
        loggedInUserNameElement.textContent = connectedUser.username;
    }

    const userListElement = document.getElementById("userList");
    // Clear any existing content in the userListElement
    userListElement.innerHTML = "Loading...";
    // Retrieve the user list from the server
    fetch('http://localhost:8080/api/v1/users')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            displayUsers(data, userListElement);
        });
}

function displayUsers(userList, userListElement) {
    userListElement.innerHTML = "";

    // Loop through the userList and create list items to display each user
    userList.forEach(user => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
                <div>
                    <i class="fa fa-user-circle"></i>
                    ${user.username} <i class="user-email">(${user.email})</i>
                </div>
                <i class="fa fa-lightbulb-o ${user.status === "online" ? "online" : "offline"}"></i>
            `;
        userListElement.appendChild(listItem);
    });
}

// Call the loadAndDisplayUsers function when the page loads
window.addEventListener("load", loadAndDisplayUsers);

// Function to handle Logout
function handleLogout() {
    fetch('http://localhost:8080/api/v1/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: JSON.parse(localStorage.getItem('connectedUser')).username })
    })
        .then((response) => {
            return response;
        })
        .then((data) => {
            localStorage.removeItem('connectedUser');
            window.location.href = "login.html";
        });
}

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", handleLogout);

// Function to handle Meeting room
function handleNewMeetingRedirect() {
    const newMeetingBtn = document.getElementById("newMeetingBtn");

    if (!newMeetingBtn) {
        console.error('Button with ID "newMeetingBtn" not found.');
        return;
    }

    newMeetingBtn.addEventListener("click", function() {
        window.location.href = "videocall.html"; // Replace with the correct path to your new HTML file
    });
}
document.addEventListener("DOMContentLoaded", handleNewMeetingRedirect);
