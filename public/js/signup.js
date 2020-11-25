/* global toastMessage */

// Getting references to our form and input
const $signUpForm = $('form.signup');

// When the signup button is clicked, we validate the email and password are not blank
$signUpForm.on('submit', (event) => {
    event.preventDefault();
    const userDataArray = $(event.currentTarget).serializeArray();

    const userData = userDataArray.reduce((userData, item) => ({ ...userData, [item.name]: item.value }), {});

    if (!userData.name || !userData.email || !userData.password) {
        return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    event.currentTarget.reset();
});

// Does a post to the signup route. If successful, we are redirected to the members page
// Otherwise we log any errors
function signUpUser({ name, email, password }) {
    $.post('/api/signup', {
        email: email,
        name: name,
        password: password,
    })
        .then((data) => {
            //
            toastMessage('success', `Thanks, ${data.name}. Redirecting in 3 sec`);
            setTimeout(() => window.location.replace('/members'), 3000);
        })
        .catch((err) => toastMessage('error', err.responseText));
}
