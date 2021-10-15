import  axios from 'axios'
const mainAxios = axios.create({
    baseURL:'https://hr-portal-api.herokuapp.com'
});
//const token = localStorage.getItem('token');
mainAxios.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    console.log(error.response.status)
    if (error.response.status === 406) {
        localStorage.clear();
        window.location.reload();
    }
    return Promise.reject(error);
});

export {
    mainAxios ,
    axios
}

