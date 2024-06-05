const form = document.querySelector("form");
form.onsubmit = (ev) => {
    localStorage.setItem('status', "true");
    window.location.href = "../index.html";
};
