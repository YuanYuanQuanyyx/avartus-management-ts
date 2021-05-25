import axios from 'axios';

const setAuthorization = (token: string) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'JWT ${token}';
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthorization