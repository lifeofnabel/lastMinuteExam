document.addEventListener('DOMContentLoaded', function() {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDbJgWFrN2fsNAHJjU5D69h6GxKosjyG-o",
    authDomain: "lastminutee-36ef6.firebaseapp.com",
    projectId: "lastminutee-36ef6",
    storageBucket: "lastminutee-36ef6.appspot.com",
    messagingSenderId: "979904708760",
    appId: "1:979904708760:web:998229f08f5477797250ed",
    measurementId: "G-D3SJS32SET"
  };
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

// Function to add question
  function addQuestion() {
    // Get values from inputs
    var question = document.getElementById('question-input').value;
    var answer = document.getElementById('answer-input').value;
    var subject = document.getElementById('subject-select').value;

    // Create a new object for your question
    var newQuestion = {
      question: question,
      answer: answer,
      subject: subject
    };

    // Add this object to Firestore
    db.collection('questions').add(newQuestion).then(() => {
      console.log("Question added successfully");
    }).catch((error) => {
      console.error("Error adding question", error);
    });
  }

// Event listener for the Add button
document.getElementById('add-btn').addEventListener('click', addQuestion);
});
