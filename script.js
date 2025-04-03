// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcIrNzuYG-7uS3qK7aVr67ukzXPL776DQ",
    authDomain: "brainiac-quizzes-site.firebaseapp.com",
    projectId: "brainiac-quizzes-site",
    storageBucket: "brainiac-quizzes-site.firebasestorage.app",
    messagingSenderId: "777702842133",
    appId: "1:777702842133:web:8637a933eb0648a167d31c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Handle Login/Signup
function loginUser() {
    let username = document.getElementById("username").value;
    if (username.trim() === "") {
        alert("Please enter a username");
        return;
    }
    localStorage.setItem("username", username);
    alert("Logged in as " + username);
    closeLoginModal();
}

// Search bar function
function searchQuizzes() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let quizzes = document.querySelectorAll(".quiz-item");
    quizzes.forEach(quiz => {
        let title = quiz.querySelector("h3").innerText.toLowerCase();
        quiz.style.display = title.includes(input) ? "block" : "none";
    });
}

// Fetch leaderboard data
function updateLeaderboard() {
    let leaderboardBody = document.getElementById("leaderboardBody");
    leaderboardBody.innerHTML = "";
    db.collection("leaderboard").orderBy("score", "desc").get().then(snapshot => {
        let rank = 1;
        snapshot.forEach(doc => {
            let data = doc.data();
            let row = `<tr><td>${rank}</td><td>${data.username}</td><td>${data.score}</td></tr>`;
            leaderboardBody.innerHTML += row;
            rank++;
        });
    });
}