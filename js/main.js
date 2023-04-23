document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const dashboardContent = document.getElementById('dashboard-content');
    const authenticationService = new AuthenticationService('https://my-json-server.typicode.com/');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const token = await authenticationService.login(email, password); // Updated to receive the token
                sessionStorage.setItem('authToken', token); // Store the token in sessionStorage
                window.location.href = 'loggedScreen.html'; // Redirect to the logged screen
            } catch (error) {
                alert('Login failed. Please try again.');
            }
        });
    } else if (dashboardContent) {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            window.location.href = 'index.html';
            return;
        }

        authenticationService.listDashboardContent(token)
            .then(content => {
                dashboardContent.innerHTML = content;
            })
            .catch(error => {
                alert('Failed to load dashboard content. Please try again.');
            });
    }
});
