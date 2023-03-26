
import axios from 'axios'

const baseEndPoint = process.env.REACT_APP_BASE_ENDPOINT


axios.interceptors.request.use(function (config) {
    const { origin } = new URL(config.url)
    const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT]// hangi istekleri yaparken headersa authotization da access-token eklenecegini belirledik. yani basepoint adresimize istek atilacaginda headers da authorzitaion a access-token i ekleyecek
    const token = localStorage.getItem('access-token')
    if(allowedOrigins.includes(origin)){
        config.headers.Authorization = token // headers da authorization a access token i ekledi
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


export const fetchProductPost = async ({ pageParam = 0 }) => {
    const { data } = await axios.get(`${baseEndPoint}/product?page=${pageParam}`)
    return data
}

export const fetchProductDetailPost = async (id) => {
    const { data } = await axios.get(`${baseEndPoint}/product/${id}`)
    return data
}

export const fetchRegister = async (input) => {
    const { data } = await axios.post(`${baseEndPoint}/auth/register`, input)
    return data
}

export const fetchMe = async () => {
    const { data } = await axios.get(`${baseEndPoint}/auth/me`)
    return data
}