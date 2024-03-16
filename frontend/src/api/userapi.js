import axios from '../axiosConfig';



export const userService = {
    async login(data) {
        try {
            const response = await axios.post('api/token/', data);
            const token = response.data.access;
            localStorage.setItem('token', token);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async register(data) {
        try {
            const response = await axios.post('register-user/', data);
            return response.data;
            console.log(response.data)
        } catch (error) {
            throw error;
        }
    },
    async fileupload(data) {
        console.log(data)
        try {
            const response = await axios.post('fileupload/', data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async getuploadfile() {
        try {
            const response = await axios.get('fileupload/');
            return response;
        } catch (error) {
            throw error;
        }
    },
    async editfile(data, id) {
        delete data['logo'];
        delete data['id'];
        try {
            const response = await axios.patch(`fileupload/${id}/`, data);
            console.log(response.status);
            return response;
        } catch (error) {
            throw error;
        }
    },
    async Deletefile(id) {
        try {
            console.log("testing", id)
            const response = await axios.delete(`fileupload/${id}/`);
            console.log(response.status)
            return response;
        } catch (error) {
            throw error;
        }
    },
    

};

export default userService;
