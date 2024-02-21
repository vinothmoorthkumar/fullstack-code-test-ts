const BASE_URL = 'https://reqres.in/api';

const apiService = {
    fetchUsers: async (page, limit, perPage) => {
        try {
            const response = await fetch(`${BASE_URL}/users?page=${page}&limit=${limit}&per_page=${perPage}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching users: ', error);
            throw error;
        }
    }
};

export default apiService;