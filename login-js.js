// Initialize Firebase
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

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User logged in:', user.uid);  // Debugging log
            let schoolCode = localStorage.getItem('schoolCode');
            
            if (!schoolCode) {
                console.warn('School code not found in local storage. Setting fallback school code.');
                schoolCode = 'KBD3083';  // Replace with a valid fallback school code if necessary
                localStorage.setItem('schoolCode', schoolCode);
            }

            console.log('School Code:', schoolCode);  // Debugging log

            return database.ref(`schools/${schoolCode}/users/${user.uid}`).once('value');
        })
        .then((snapshot) => {
            const userData = snapshot.val();
            console.log('User data:', userData);  // Debugging log

            if (userData) {
                localStorage.setItem('userRole', userData.role);
                localStorage.setItem('schoolCode', userData.schoolCode);
                window.location.href = 'main.html'; // Redirect to main application page
            } else {
                throw new Error('User data not found');
            }
        })
        .catch((error) => {
            console.error('Login error:', error);  // Debugging log
            alert('Error: ' + error.message);
        });
});

document.getElementById('reset-password').addEventListener('click', function() {
    const email = document.getElementById('login-email').value;
    if (email) {
        auth.sendPasswordResetEmail(email)
            .then(() => {
                alert('Password reset email sent. Check your inbox.');
            })
            .catch((error) => {
                alert('Error: ' + error.message);
            });
    } else {
        alert('Please enter your email address to reset your password.');
    }
});
