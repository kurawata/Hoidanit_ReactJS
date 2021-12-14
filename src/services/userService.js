import { userService } from ".";
import axios from "../axios";


const handleUserLoginAPI = (userEmail, userPpassword) => {
    return axios.post('/api/login', {
        email: userEmail,
        password: userPpassword
    });
}

const getAllUser = (inputId) => {
    //template string
    return axios.get(`/api/get-all-user?id=${inputId}`);
}

export { handleUserLoginAPI, getAllUser };

