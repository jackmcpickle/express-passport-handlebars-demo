// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
$.get('/api/user_data').then(function (data) {
    const topNav = data.name
        ? `
        <li class="nav-item">
            <a href="/members" class="nav-link">
            Hi, ${data.name}
            </a>
        </li>
        <li class="nav-item">
            <a href="/logout" class="nav-link">
            Logout
            </a>
        </li>
        `
        : `
        <li class="nav-item">
            <a href="/login" class="nav-link">Login</a>
        </li>
        `;
    $('.js-member-update').html(topNav);
});

// Move to window to reuse.
window.toastTemplate = (alertType, message) => {
    let title = 'Message';
    let alertTypeColour = '#007aff';
    switch (alertType) {
    case 'error':
        title = 'Error';
        alertTypeColour = '#dc3545';
        break;
    case 'success':
        title = 'Success';
        alertTypeColour = '#28a745';
        break;

    default:
        // use initial
        break;
    }
    return `
<div aria-live="polite" aria-atomic="true" style="position: relative;">
    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" style="position: absolute; top: 20px; right: 20px;">
        <div class="toast-header" style="min-width: 250px;">
            <svg class="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect width="100%" height="100%" fill="${alertTypeColour}"></rect></svg>
            <strong class="mr-auto">${title}</strong>
            <small class="text-muted">1 sec ago</small>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    </div>
</div>
`;
};

window.toastMessage = (type, message) => {
    const $alert = $('#alert');
    const output = toastTemplate(type, message);
    $alert.html(output);
};
