
import axios from 'axios'

const baseEndPoint = process.env.REACT_APP_BASE_ENDPOINT


axios.interceptors.request.use(function (config) {
    const { origin } = new URL(config.url)
    const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT]// hangi istekleri yaparken headersa authotization da access-token eklenecegini belirledik. yani basepoint adresimize istek atilacaginda headers da authorzitaion a access-token i ekleyecek
    const token = localStorage.getItem('access-token')
    if (allowedOrigins.includes(origin)) {
        config.headers.Authorization = token // headers da authorization a access token i ekledi
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


export const fetchProductPost = async ({ pageParam = 0 }) => {
    const { data } = await axios.get(`${baseEndPoint}/product?page=${pageParam}`)
    // console.log('fetchProduct',data)
    return data
}

export const fetchProductDetailPost = async (id) => {
    const { data } = await axios.get(`${baseEndPoint}/product/${id}`)
    // console.log('fetchProductDetail',data)
    return data
}

export const postProduct = async (input) => {
    const { data } = await axios.post(`${baseEndPoint}/product`,input)
    // console.log('postProduct',data)
    return data
}

export const fetchRegister = async (input) => {
    const { data } = await axios.post(`${baseEndPoint}/auth/register`, input)
    // console.log('fetchRegister',data)
    return data
}

export const fetchLogin = async (input) => {
    const { data } = await axios.post(`${baseEndPoint}/auth/login`, input)
    // console.log('fetchLogin',data)
    return data
}

export const fetchMe = async () => {
    const { data } = await axios.get(`${baseEndPoint}/auth/me`)
    // console.log('fetchProduct',data)
    return data
}

export const fetchLogout = async () => {
    const { data } = await axios.post(`${baseEndPoint}/auth/logout`, { refresh_token: localStorage.getItem("refresh-token") })
    //console.log('fetchLogout',data)
    return data
}

export const postOrder = async (input) => {
    const { data } = await axios.post(`${baseEndPoint}/order`, input)
    // console.log('postOrder',data)
    return data
}

export const fetchOrders = async () => {
    const { data } = await axios.get(`${baseEndPoint}/order`)
    // console.log('fetchOrder',data)
    return data
}

export const deleteProduct = async (product_id) => {
    const { data } = await axios.delete(`${baseEndPoint}/product/${product_id}`)
    // console.log('deleteProduct',data)
    return data
}

export const updateProduct = async (input,product_id) => {
    const { data } = await axios.put(`${baseEndPoint}/product/${product_id}`,input)
    console.log('updateProduct',data)
    return data
}

