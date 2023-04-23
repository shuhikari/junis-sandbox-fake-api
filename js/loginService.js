class AuthenticationService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async login(email, password) {
        try {
            const response = await fetch(`${this.apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Retorno da API', data);
            const { accessToken } = data;
            return accessToken
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async listDashboardContent(token) {
        try {
            const response = await fetch(`${this.apiUrl}/order`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch dashboard content');
            }

            const data = await response.json();
            console.log('Order Content', data);
            return data.content;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}
