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

const createNewUserService = (data) => {
    console.log('check data from sevices: ', data);
    return axios.post('/api/create-new-user', data);
}

const deleteUserSevice = (id) => {
    console.log(id);
    return axios.delete(`/api/delete-user?id=${id}`);
}

export { handleUserLoginAPI, getAllUser, createNewUserService, deleteUserSevice };

