import { userService } from ".";
import axios from "../axios";


const handleUserLoginAPI = (userEmail, userPpassword) => {
    return axios.post('/api/login', {
        email: userEmail,
        password: userPpassword
    });
}

export { handleUserLoginAPI };

