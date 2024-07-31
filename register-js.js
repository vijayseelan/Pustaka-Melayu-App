// Initialize Firebase (same config as login page)
const firebaseConfig = {
    apiKey: "AIzaSyBVBxgwHvPRUsMiDggziYZnLa5JuYTFI1E",
    authDomain: "lms-bm-reading.firebaseapp.com",
    databaseURL: "https://lms-bm-reading-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lms-bm-reading",
    storageBucket: "lms-bm-reading.appspot.com",
    messagingSenderId: "388779759262",
    appId: "1:388779759262:web:955d777ed608a2c1118d8f",
    measurementId: "G-44730J0JV0"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const schoolCode = document.getElementById('school-code').value;
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('user-role').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return database.ref(`schools/${schoolCode}/users/${user.uid}`).set({
                schoolCode: schoolCode,
                name: fullName,
                email: email,
                role: role
            });
        })
        .then(() => {
            alert('Registration successful! You can now log in.');
            window.location.href = 'index.html'; // Redirect to login page
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
});
