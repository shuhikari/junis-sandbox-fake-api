document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const dashboardContent = document.getElementById('dashboard-content');
    const authenticationService = new AuthenticationService('https://my-json-server.typicode.com/shuhikari/junis-sandbox-fake-api');

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
                console.log('Content', content);
                content.forEach((item) => {
                    const content = `
                        <div class="item" id="${item.id}">
                        <h2 class="item-title">${item.title}</h2>
                        <div class="item-description">${item.content}</div>
                        <span class="item-author" style="font-size:small">Autor: ${item.author}</span>
                        </div>
                        <br />
                    `
                    const itemElement = createCustomHtmlElement('div', item.id, 'item', content);

                    dashboardContent.appendChild(itemElement)
                })

            })
            .catch(error => {
                console.error(error.message);
                alert('Failed to load dashboard content. Please try again.');
            });
    }
});

function createCustomHtmlElement(elementType, elementId, elementClass, elementContent) {
    console.log('Creating element', elementType, elementId, elementClass, elementContent);
    const element = document.createElement(elementType);
    element.id = elementId;
    element.className = elementClass;
    element.innerHTML = elementContent;
    return element;
}
