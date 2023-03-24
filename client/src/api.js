
import axios from 'axios'

const endPoint = process.env.REACT_APP_BASE_ENDPOINT

export const fetchProductPost = async () => {
    const {data} = await axios.get( `${endPoint}/product?page=1` )
    return data
}

export const fetchProductDetailPost= async (id)=>{
    const {data} = await axios.get(`${endPoint}/product/${id}`)
    return data
}