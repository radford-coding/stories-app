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