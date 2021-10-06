import  axios from 'axios'
const mainAxios = axios.create({
    baseURL:'https://hr-portal-api.herokuapp.com'
});

export {
    mainAxios ,
    axios
}
