import firebase from 'firebase';
import { ref, onUnmoubted} from 'vue';

const firebaseConfig = {
    apiKey: "AIzaSyAb_8BOx0NnAU4kXAfuZXOqp5UISPF9XjE",
    authDomain: "todolist-a7d9f.firebaseapp.com",
    projectId: "todolist-a7d9f",
    storageBucket: "todolist-a7d9f.appspot.com",
    messagingSenderId: "464108865418",
    appId: "1:464108865418:web:61b4c145695398c816ea73",
    measurementId: "G-L509VLLY47"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
const jobCollection = db.collection('Jobs');


export const createJob = job => {
    return jobCollection.add(job);
}
export const updateJob = (id, text) => {
    return jobCollection.doc(id).update(text);
}
export const loadJobsByName = () => {
    const jobsx = ref([])
    const close = jobCollection.onSnapshot(snapshot => {
        jobsx.value = snapshot.doc.map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmoubted(close)
    return jobsx
}
export const deleteJobsById = (id) => {
    return jobCollection.doc(id).delete();
}


export const userLoadUsers = (username) => {
    var userExist = username + " - ";

    db.collection('Users').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            userExist = userExist + doc.data().username
        })
    })
    return userExist
}
