document.addEventListener('DOMContentLoaded', function() {
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

  let currentQuestionId = null;  // Variable zur Speicherung der aktuellen Frage-ID

  // Hilfsfunktion zum Zufällig Auswählen eines Dokuments aus einer Liste
  function getRandomQuestion(questionsList) {
    const randomIndex = Math.floor(Math.random() * questionsList.length);
    return questionsList[randomIndex];
  }

  // Funktion zum Laden der Fragen aus Firestore basierend auf dem Fach
  async function loadQuestions(subject) {
    const questionsRef = db.collection('questions');
    const query = questionsRef.where("subject", "==", subject);
    query.get().then(function(querySnapshot) {
      const questionList = [];
      querySnapshot.forEach(function(doc) {
        questionList.push({ id: doc.id, ...doc.data() });
      });

      if(questionList.length > 0) {
        const randomQuestion = getRandomQuestion(questionList);
        displayQuestion(randomQuestion);
      } else {
        console.log('No questions found for this subject');
      }
    }).catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  }

  // Funktion zum Anzeigen der Frage und der Antwort
  function displayQuestion(questionData) {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = ''; // Vorhandene Inhalte löschen

    if(questionData) {
      currentQuestionId = questionData.id;  // Speichere die ID der aktuellen Frage
      const card = createCard(questionData);
      questionContainer.appendChild(card);
    }
  }

  // Hilfsfunktion zum Erstellen der Fragekarten
  function createCard(questionData) {
    const card = document.createElement('div');
    card.className = 'card';

    const questionDiv = document.createElement('div');
    questionDiv.className = 'card-content card-front';
    questionDiv.innerText = questionData.question || 'No question available';

    const answerDiv = document.createElement('div');
    answerDiv.className = 'card-content card-back';
    answerDiv.innerText = questionData.answer || 'No answer available';

    card.appendChild(questionDiv);
    card.appendChild(answerDiv);

    card.addEventListener('click', () => {
      card.classList.toggle('flip');
    });

    return card;
  }

  // Event Listener für den "Start Game" Button
  document.getElementById('start-game-btn').addEventListener('click', function() {
    const selectedSubject = document.getElementById('subject-select').value;
    loadQuestions(selectedSubject).then(() => console.log('Questions loaded'));
  });

  document.getElementById('next-question-btn').addEventListener('click', function() {
    const selectedSubject = document.getElementById('subject-select').value;
    loadQuestions(selectedSubject).then(() => console.log('Questions loaded'));
  });

  // DELETE Button Event Listener
  document.getElementById("deleteButton").addEventListener("click", function() {
    if (currentQuestionId) {
      const confirmation = confirm("Do you really want to delete this question?");
      if (confirmation) {
        deleteDocument(currentQuestionId);
      }
    } else {
      console.log("No question is currently loaded to delete.");
    }
  });

  // Funktion zum Löschen eines Dokuments aus Firestore
  async function deleteDocument(docId) {
    try {
      await db.collection("questions").doc(docId).delete();
      console.log(`Document with ID ${docId} has been successfully deleted.`);
      alert(`Document with ID ${docId} has been successfully deleted.`);
      document.getElementById('question-container').innerHTML = '';  // Clear the question container after deletion
      currentQuestionId = null;  // Reset the current question ID
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Error deleting document. Please try again.");
    }
  }
});
