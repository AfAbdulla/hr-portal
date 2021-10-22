import axios from 'axios'

const mainAxios = axios.create({
    baseURL: 'https://hr-portal-api.herokuapp.com'
});


/*let token = localStorage.getItem('token');
console.log(localStorage.getItem('token'));
console.log(token)*/
/*mainAxios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
    } else if (error.response.status === 406) {

    }
    return Promise.reject(error);
});*/

mainAxios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            localStorage.clear();
            window.location.href = '/login';
        }

        if (error.response.status === 406) {
            mainAxios({
                method: 'post',
                url: '/auth/refresh',
                data: {
                    token : localStorage.getItem('token')
                }
            }).then((res) => {
                console.log(res.data.data)
                localStorage.setItem('token', res.data.data);
                })
        }

        return Promise.reject(error);

    }
)

export {
    mainAxios,
    axios
}

