// Importieren der notwendigen Firebase-Module
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyDbJgWFrN2fsNAHJjU5D69h6GxKosjyG-o",
  authDomain: "lastminutee-36ef6.firebaseapp.com",
  projectId: "lastminutee-36ef6",
  storageBucket: "lastminutee-36ef6.appspot.com",
  messagingSenderId: "979904708760",
  appId: "1:979904708760:web:998229f08f5477797250ed",
  measurementId: "G-D3SJS32SET"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Funktion zum Laden der Fragen aus Firestore
async function loadQuestions() {
  const questionsCol = collection(db, 'questions');
  const questionSnapshot = await getDocs(questionsCol);
  const questionList = questionSnapshot.docs.map(doc => doc.data());

  const questionContainer = document.getElementById('question-container');
  questionContainer.innerHTML = ''; // Vorhandene Inhalte löschen

  questionList.forEach((question) => {
    const card = createCard(question);
    questionContainer.appendChild(card);
  });
}

// Hilfsfunktion zum Erstellen der Fragekarten
function createCard(questionData) {
  const card = document.createElement('div');
  card.className = 'card';

  const questionDiv = document.createElement('div');
  questionDiv.className = 'card-content card-front';
  questionDiv.innerText = questionData.question;

  const answerDiv = document.createElement('div');
  answerDiv.className = 'card-content card-back';
  answerDiv.innerText = questionData.answer;

  card.appendChild(questionDiv);
  card.appendChild(answerDiv);

  card.addEventListener('click', () => {
    card.classList.toggle('flip');
  });

  return card;
}

// Laden der Fragen, wenn die Anwendung startet
loadQuestions().then(r =>  console.log('Fragen geladen'));
