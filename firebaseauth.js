// ✅ Import Firebase modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
 
const firebaseConfig = {
    apiKey: "AIzaSyADmobpcYEo998b8fB1BWjvDvmOuod6tas",
    authDomain: "cakeordering-system-3fe61.firebaseapp.com",
    projectId: "cakeordering-system-3fe61",
    storageBucket: "cakeordering-system-3fe61.firebasestorage.app",
    messagingSenderId: "705537296375",
    appId: "1:705537296375:web:3df3bab97bba225ef290f2"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Function to Show Messages
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = 'block';
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// ✅ Handle Sign-Up
document.getElementById('signupForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fullName = document.getElementById('fName').value;
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const confirmPassword = document.getElementById('rConfirmPassword').value;

    if (password !== confirmPassword) {
        showMessage("Passwords do not match!", 'signUpMessage');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // ✅ Store user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            fullName: fullName,
            email: email
        });

        showMessage("Account Created Successfully!", 'signUpMessage');
        setTimeout(() => window.location.replace('login.html'), 2000); // Redirect after sign-up
    } catch (error) {
        showMessage(error.message, 'signUpMessage');
    }
});

// ✅ Handle Login (Redirect to shop.html after successful login)
document.getElementById('loginForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        showMessage("Login Successful!", 'signInMessage');
        
        // ✅ Redirect to shop.html after login
        setTimeout(() => window.location.replace('shop.html'), 2000); 
    } catch (error) {
        showMessage("Invalid email or password!", 'signInMessage');
    }
});

// ✅ Protect Dashboard Page (Redirect to login if user is not logged in)
onAuthStateChanged(auth, (user) => {
    if (!user && window.location.pathname.includes("dashboard.html")) {
        window.location.replace("login.html");
    }
});

// ✅ Logout Function (Redirects to login after logout)
document.getElementById('logoutBtn')?.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.replace("login.html");
    }).catch((error) => {
        console.error("Logout error:", error);
    });
});
