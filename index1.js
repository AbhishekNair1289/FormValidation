const form = document.getElementById("regForm");
const uname = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const conpassword = document.getElementById("conpassword");
const phone = document.getElementById("phone");
const dob = document.getElementById("dob");
const errorMessage = document.getElementById("error-message");
const submitButton = document.getElementById("submitBtn");

let timer; // Variable to hold the timer

// Function to start the timer
function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
      window.location.reload(); // Refresh the page when timer reaches zero
    }
  }, 1000);
}

// Start the timer when the page loads
window.onload = function () {
  const twoMinutes = 60, // 2 minutes in seconds
    display = document.querySelector("#timer");
  startTimer(twoMinutes, display);
};

// Initially disable the submit button
submitButton.disabled = true;

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission by default

  // Trimmed values of form inputs
  const nameValue = uname.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const conpasswordValue = conpassword.value.trim();
  const phoneValue = phone.value.trim();
  const dobValue = dob.value.trim();

  // Check if any field is empty
  if (
    nameValue === "" ||
    emailValue === "" ||
    passwordValue === "" ||
    conpasswordValue === "" ||
    phoneValue === "" ||
    dobValue === ""
  ) {
    errorMessage.innerText = "";
    errorMessage.style.color = "red";
    return; // Exit the function if any field is empty
  } else if (validateForm()) {
    // If all fields are filled, clear error message
    errorMessage.innerText = "";
    alert("Form submitted successfully!");
    window.location.reload();
  }

  // If all fields are filled, clear error message
  //   errorMessage.innerText = "";
});

// if (validateForm) {
//   console.log(validateForm);
//   submitButton.removeAttribute("disabled");
// }
// Validation functions
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

// Dynamic validation as user types
uname.addEventListener("input", function () {
  isValidName();
  // updateSubmitButton();
});

phone.addEventListener("input", function () {
  isValidPhone();
  // updateSubmitButton();
});

email.addEventListener("input", function () {
  isValidEmail();
  // updateSubmitButton();
});

password.addEventListener("input", function () {
  isValidPassword();
  // updateSubmitButton();
});

conpassword.addEventListener("input", function () {
  isValidConPassword();
  // updateSubmitButton();
});

dob.addEventListener("input", function () {
  isValidDob();
  // updateSubmitButton();
});

const isValidName = () => {
  const nameVal = uname.value.trim();
  if (nameVal.length === 0) {
    setError(uname, "**Name is required ");
    submitButton.disabled = true;
    return false;
  } else if (!/^[A-Za-z]*$/.test(nameVal)) {
    setError(uname, "**Numeric is not allowed ");
    submitButton.disabled = true;
    return false;
  } else if (nameVal.length < 3) {
    setError(uname, "**Minimum 3 characters required ");
    submitButton.disabled = true;
    return false;
  } else if (nameVal.length > 20) {
    setError(uname, "**Name should be less than 20 characters ");
    submitButton.disabled = true;
    return false;
  } else {
    setSuccess(uname);
    submitButton.disabled = false;
    return true;
  }
};

const isValidEmail = () => {
  const emailVal = email.value.trim();
  if (emailVal.length === 0) {
    setError(email, " **Email is required");
    submitButton.disabled = true;
    return false;
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailVal)) {
    setError(email, " **Invalid Email");
    submitButton.disabled = true;
    return false;
  } else {
    setSuccess(email);
    submitButton.disabled = false;
    return true;
  }
};

const isValidPassword = () => {
  const passVal = password.value.trim();
  if (passVal.length === 0) {
    setError(password, " **Password cannot be null");
    submitButton.disabled = true;
    return false;
  } else if (passVal.length < 8 || passVal.length > 20) {
    setError(password, " **Password should be between 8 and 20 characters");
    submitButton.disabled = true;
    return false;
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      passVal
    )
  ) {
    setError(
      password,
      " **Password must include an uppercase letter, a lowercase letter, a number, and a special character."
    );
    submitButton.disabled = true;
    return false;
  } else {
    setSuccess(password);
    submitButton.disabled = false;
    return true;
  }
};

const isValidConPassword = () => {
  const passVal = password.value.trim();
  const conPassVal = conpassword.value.trim();
  if (passVal !== conPassVal) {
    setError(conpassword, "**Password does not match");
    submitButton.disabled = true;
    return false;
  } else {
    setSuccess(conpassword);
    submitButton.disabled = false;
    return true;
  }
};

const isValidPhone = () => {
  const phoneVal = phone.value.trim();
  if (phoneVal.length === 0) {
    setError(phone, " **Phone number is required");
    submitButton.disabled = true;
    return false;
  } else if (!/^[6-9]\d{9}$/.test(phoneVal)) {
    setError(phone, " **Phone Number should be of 10 digits");
    submitButton.disabled = true;
    return false;
  } else {
    setSuccess(phone);
    submitButton.disabled = false;
    return true;
  }
};

const isValidDob = () => {
  const dobVal = dob.value.trim();
  const currentDate = new Date();
  const inputDate = new Date(dobVal);

  if (dobVal === "") {
    setError(dob, " **Date of Birth required");
    submitButton.disabled = true;
    return false;
  } else if (inputDate > currentDate) {
    setError(dob, " **You can't select a future date as your DOB");
    submitButton.disabled = true;
    return false;
  } else {
    setSuccess(dob);
    submitButton.disabled = false;
    return true;
  }
};

// function updateSubmitButton() {
//   if (
//     isValidName() &&
//     isValidPhone() &&
//     isValidEmail() &&
//     isValidPassword() &&
//     isValidConPassword() &&
//     isValidDob()
//   ) {
//     submitButton.disabled = false;
//   } else {
//     submitButton.disabled = true;
//   }
// }

function validateForm() {
  const isNameValid = isValidName();
  const isPhoneValid = isValidPhone();
  const isEmailValid = isValidEmail();
  const isPasswordValid = isValidPassword();
  const isConfirmPasswordValid = isValidConPassword();
  const isDobValid = isValidDob();

  return (
    isNameValid &&
    isPhoneValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isDobValid
  );
}
