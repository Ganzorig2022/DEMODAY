import { signUp, signIn, logOut } from "./firebase_auth.js";

// Run getRatings when DOM loads
document.addEventListener("DOMContentLoaded", getRatings);

const starsTotal = 5;
// Get ratings
function getRatings() {
  // Get percentage
  const numberRating = document.getElementById("number-rating");
  let numberRatingValue = numberRating.textContent;

  const starPercentage = (numberRatingValue / starsTotal) * 100;

  // Round to nearest 10
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

  // Set width of stars-inner to percentage
  const starsInner = document.querySelector(".stars-inner");
  starsInner.style.width = starPercentageRounded;
}

// =================Button Effect====================
const buttons = document.querySelectorAll(".ripple");
buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    // mouse-iin bairshliig X, Y toogoor gargaj ogno.
    const x = e.clientX;
    const y = e.clientY;

    // button bairshliig gargaj ogno.
    const buttonTop = e.target.offsetTop;
    const buttonLeft = e.target.offsetLeft;

    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;

    const circle = document.createElement("span");

    // circle.className = "circle"- ni classList.add-tai adilhan.
    circle.classList.add("circle");
    this.appendChild(circle);
    circle.style.top = yInside + "px";
    circle.style.left = xInside + "px";

    setTimeout(() => circle.remove(), 200);
  });
});

// ========================Profile window Open=====================
const userProfileBtn = document.getElementsByClassName("profile")[0];

userProfileBtn.addEventListener("click", () => {
  const userProfile = document.getElementsByClassName("user-profile-modal")[0];
  userProfile.classList.toggle("hidden");
});

// ========================Cart Modal Window Open=====================
const cartIconBtn = document.getElementsByClassName("fa-shopping-cart")[0];

cartIconBtn.addEventListener("click", () => {
  const cartModal = document.getElementsByClassName("cart-modal")[0];
  cartModal.classList.toggle("hidden");
});

// ========================LOGIN MODAL window Open=====================
const loginOpen = document.getElementById("login-open");
let loginModal = document.getElementsByClassName("login-modal-container")[0];
const loginClose = document.getElementById("modal-close-btn");

loginOpen.addEventListener("click", () => {
  loginModal.classList.add("show-modal");
});
loginClose.addEventListener("click", () => {
  loginModal.classList.remove("show-modal");
});

window.addEventListener("click", (e) => {
  e.target == loginModal ? loginModal.classList.remove("show-modal") : false;
});

// ========================SIGNUP MODAL window Open=====================
let singupOpen = document.getElementById("signup-open");
let signupModal = document.getElementById("signup-modal");
const signupClose = document.getElementById("signup-close-btn");

singupOpen.addEventListener("click", () => {
  signupModal.classList.add("show-modal");
});
signupClose.addEventListener("click", () => {
  signupModal.classList.remove("show-modal");
});

window.addEventListener("click", (e) => {
  e.target == signupModal ? signupModal.classList.remove("show-modal") : false;
});

//////////////////////////////////FIRESTORE///////////////////////////
// =============================GLOBAL VARIABLES=======================
const signupBtn = document.getElementById("signup-submit-btn");
const signinBtn = document.getElementById("login-submit-btn");
const logoutBtn = document.getElementById("logout-btn");
const userProfileModal =
  document.getElementsByClassName("user-profile-modal")[0];
const userProfileModalHeader = document.getElementById(
  "user-profile-modal--header"
);
let loginInputs = document.querySelectorAll(".login-modal-form input");

let isSuccessful = false;

// ===========================SIGN UP NEW USER=======================
signupBtn.addEventListener("click", () => {
  const signupName = document.getElementById("signup-name").value;
  const signupEmail = document.getElementById("signup-email").value;
  const signupPassword = document.getElementById("signup-password").value;
  isSuccessful = signUp(signupEmail, signupPassword, signupName);

  if (isSuccessful) {
    swal("Шинэ хэрэглэгч үүслээ!");

    signupModal.classList.remove("show-modal");

    disableLoginInputs();
    clearSignupInputs();

    signinBtn.defaultValue = "Та нэвтэрсэн байна!";
    showUserName();
  } else {
    swal("Та нэвтрээгүй байна");

    enableLoginInputs();

    signinBtn.defaultValue = "Нэвтрэx";
  }
});

// ===========================SIGN IN EXISTING USER=======================

signinBtn.addEventListener("click", async () => {
  const signinEmail = document.getElementById("login-email").value;
  const signinPassword = document.getElementById("login-password").value;

  isSuccessful = await signIn(signinEmail, signinPassword);

  if (isSuccessful) {
    swal("Та амжилттай нэвтэрлээ!");

    loginModal.classList.remove("show-modal");
    disableLoginInputs();
    clearLoginInputs();

    showUserName();
  }
});

// =========================LOG OUT USER=================
logoutBtn.addEventListener("click", async () => {
  isSuccessful = await logOut();
  if (isSuccessful) {
    // swal("Та системээс гарлаа.");
    localStorage.removeItem("loggedUserUid");
    userProfileModal.classList.remove("hidden");
    userProfileModalHeader.innerHTML = `Хэрэглэгч:`;

    enableLoginInputs();
  } else {
    disableLoginInputs();
  }
});

// SIGN IN hiisnii daraa input-uudiig IDEWHGV bolgoh

function disableLoginInputs() {
  loginInputs.forEach((input) => {
    input.setAttribute("disabled", "");
  });
}

// SIGN OUT hiisnii daraa input-uudiig IDEWHTEI bolgoh

function enableLoginInputs() {
  loginInputs.forEach((input) => {
    input.removeAttribute("disabled");
  });
}

function clearLoginInputs() {
  const signinEmail = document.getElementById("login-email");
  const signinPassword = document.getElementById("login-password");

  signinEmail.value = "";
  signinPassword.value = "";
}
function clearSignupInputs() {
  const signupName = document.getElementById("signup-name");
  const signupEmail = document.getElementById("signup-email");
  const signupPassword = document.getElementById("signup-password");

  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
}

// =========================USER NAME-iig Haruulah=================
function showUserName() {
  let userData = JSON.parse(localStorage.getItem("loggedUserUid"));

  let userName = userData.name;

  userProfileModalHeader.innerHTML = `Хэрэглэгч: ${userName}`;
}
showUserName();
