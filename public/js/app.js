const usernameComplexity = () => {
    const username = document.querySelector('input[name=username]');
    const usernamePattern = /^\w{6,24}$/;
    if (usernamePattern.test(username)) {
        username.setCustomValidity('');
    } else {
        username.setCustomValidity('Username must be 6-24 alphanumeric characters.');
    };
};

const pwdComplexity = () => {
    const pwd = document.querySelector('input[name=password');
    const pwdPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
    if (pwdPattern.test(pwd.value)) {
        pwd.setCustomValidity('');
    } else {
        pwd.setCustomValidity('Password must be 8-32 characters, and contain a number, a lowercase letter, and an uppercase letter.');
    };
};

const pwdVerify = () => {
    const pwd = document.querySelector('input[name=password');
    const confirm = document.querySelector('input[name=confirmPassword]');
    if (confirm.value === pwd.value) {
        confirm.setCustomValidity('');
    } else {
        confirm.setCustomValidity('Passwords do not match.');
    };
};

const authorBtn = document.getElementById('userType');
const toggleableEls = document.querySelectorAll('.reveal-if-active');

if (authorBtn) {
    authorBtn.addEventListener('change', () => {
        toggleableEls.forEach(e => {
            e.classList.toggle('reveal-if-active');
        });
    });
};