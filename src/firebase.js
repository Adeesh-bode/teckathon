// import { initializeApp } from 'firebase/app';

// const app = initializeApp({
  // apiKey: "AIzaSyAKIGET9Jl13kAn5cK6GTXM_A8xaX9QzEY",
  // authDomain: "resumebuilder-c949c.firebaseapp.com",
  // projectId: "resumebuilder-c949c",
  // storageBucket: "resumebuilder-c949c.appspot.com",
  // messagingSenderId: "1071530901076",
  // appId: "1:1071530901076:web:1d700139504ba990a3f7c1",
  // measurementId: "G-L8MRSFQXZC"
// });


// export default app;

                                                                // PART1 : Initialize App

// we have to initialize a instance of firebase here...

import { initializeApp } from "firebase/app";


const firebaseConfig = {                                    // configuration given by firebase to our account 
  apiKey: "AIzaSyAKIGET9Jl13kAn5cK6GTXM_A8xaX9QzEY",
  authDomain: "resumebuilder-c949c.firebaseapp.com",
  projectId: "resumebuilder-c949c",
  storageBucket: "resumebuilder-c949c.appspot.com",
  messagingSenderId: "1071530901076",
  appId: "1:1071530901076:web:1d700139504ba990a3f7c1",
  measurementId: "G-L8MRSFQXZC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


                                                                // PART2 : Create a key

// will be using authentication service of firebase(SDK) here...which is in auth module of firebase
import { getAuth} from "firebase/auth";

const auth = getAuth(); // auth is a key ( our authority is encapsulated in it)

                                                                // PART3: Google auth
import { GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
                                                                // PART4: Connection With Database
import { getFirestore } from "firebase/firestore";

// Initialize Cloud Firestore and get a reference to the service
 const db = getFirestore(app);

export { auth , provider , db }; // exporting all the keys to be used in other files
