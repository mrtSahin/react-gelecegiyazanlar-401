import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Box, Text, Button } from '@chakra-ui/react'
import { fetchProductDetailPost } from '../../api'
import moment from 'moment'
import ImageGallery from 'react-image-gallery';

function ProductDetail() {

  const { product_id } = useParams()

  const { isLoading, error, data } = useQuery(['product', product_id], () => fetchProductDetailPost(product_id))

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  console.log(data)

  const images = data.photos.map(url=>({original:url}))

  console.log(images)
  return (
    <div>
      <Button colorScheme='pink'>Add To Basket</Button>
      <Text as='h2' fontSize='2xl'>{data.title}</Text>
      <Text>{moment(data.createdAt).format('DD/MM/YYYY')}</Text>
      <p>
        {data.description}
      </p>
      <Box margin='10'>
        <ImageGallery items={images}/>
      </Box>

    </div >
  )
}

export default ProductDetail