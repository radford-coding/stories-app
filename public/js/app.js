const pwdVerify = () => {
    const pwd = document.querySelector('input[name=password');
    const confirm = document.querySelector('input[name=confirmPassword]');
    if (confirm.value === pwd.value) {
        confirm.setCustomValidity('');
    } else {
        confirm.setCustomValidity('Passwords do not match.');
    };
};