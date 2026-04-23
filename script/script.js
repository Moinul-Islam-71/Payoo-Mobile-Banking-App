const loginBtn = document.getElementById(`login-btn`);

function showToast(
    message, type = "error", time = 2000
) {
    
    const alertContainer = document.getElementById('alert-container');

    const bgClass = type === "success" ? "bg-violet-200 text-violet-500" : "bg-red-200 text-red-500";


    alertContainer.innerHTML = `
    
        <div class="toast toast-top toast-center">
            <div class="alert ${bgClass} border-none font-bold">
                <span>${message}</span>
            </div>
        </div>

    `;

    setTimeout(() => {
        alertContainer.innerHTML = ""
    }, `${time}`)
}



function getValue(idName) {
    return document.getElementById(idName).value;
}


function notify(e, message, type = "error") {
    showToast(message, type);
}


function validateLogin(mobileNumber, pinNumber, defaultMobileNumber = "01811111111", defaultPinNumber = "1234") {
    if (mobileNumber !== defaultMobileNumber && pinNumber !== defaultPinNumber) return "Invalid Mobile & Pin!";
    if (mobileNumber !== defaultMobileNumber)                                   return "Invalid Mobile Number!";
    if (pinNumber !== defaultPinNumber)                                         return "Invalid Pin Number!";
    return null; // সব ঠিক আছে
}

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const mobileNumber = getValue(`mobile-number`);
    const pinNumber    = getValue(`pin-number`);

    const error = validateLogin(mobileNumber, pinNumber);
    if (error) { showToast(error); return; }

    showToast("Login Successful", "success", 1000);
    setTimeout(() => { window.location.href = "./home.html"; }, 1000);
});