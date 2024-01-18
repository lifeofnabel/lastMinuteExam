class FirebaseHandler {
  constructor() {
    this.firebaseConfig = {
      apiKey: "Dein-API-Schlüssel",
      authDomain: "Deine-Auth-Domain",
      projectId: "Deine-Projekt-ID",
      storageBucket: "Dein-Storage-Bucket",
      messagingSenderId: "Deine-Messaging-Sender-ID",
      appId: "Deine-App-ID",
      measurementId: "Deine-Measurement-ID (optional)"
    };

    this.app = null;
    this.analytics = null;
  }

  initializeFirebase() {
    if (!this.app) {
      this.app = initializeApp(this.firebaseConfig);
      this.analytics = getAnalytics(this.app);
    }
  }
}

// Verwende die FirebaseHandler-Klasse in deinem Projekt
const firebaseHandler = new FirebaseHandler();
firebaseHandler.initializeFirebase();
