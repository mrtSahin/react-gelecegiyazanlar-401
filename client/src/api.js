
import axios from 'axios'

export const fetchProductPost = async () => {
    const {data} = await axios.get('http://localhost:4000/product?page=1')
    return data
}

export const fetchProductDetailPost= async (id)=>{
    const {data} = await axios.get(`http://localhost:4000/product/${id}`)
    return data
}