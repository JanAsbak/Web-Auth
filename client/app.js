let mode = "register";

const formTitle = document.querySelector("#form-title");
const submitBtn = document.querySelector("#input-submit");
const usernameInput = document.querySelector("#input-username");
const passwordInput = document.querySelector("#input-password");

const loginBtn = document.querySelector("#show-login");
const registerBtn = document.querySelector("#show-register");

function setActiveButton() {
    if (mode === "login") {
        loginBtn.classList.add("active");
        registerBtn.classList.remove("active");
    } else {
        registerBtn.classList.add("active");
        loginBtn.classList.remove("active");
    }
}

loginBtn.addEventListener("click", () => {
    mode = "login";
    formTitle.textContent = "Login";
    submitBtn.textContent = "Login";
    usernameInput.value = "";
    passwordInput.value = "";
    setActiveButton();
});

registerBtn.addEventListener("click", () => {
    mode = "register";
    formTitle.textContent = "Register";
    submitBtn.textContent = "Register";
    usernameInput.value = "";
    passwordInput.value = "";
    setActiveButton();
});

setActiveButton();

submitBtn.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        alert("Fill in all fields.");
        return;
    }

    const url = mode === "login" 
        ? "http://localhost:3000/login"
        : "http://localhost:3000/register";

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        alert(data.message);

        if (data.success && mode === "register") {
            loginBtn.click();
        }

    } catch (err) {
        console.error(err);
        alert("Something went wrong on the server-side.");
    }
});
