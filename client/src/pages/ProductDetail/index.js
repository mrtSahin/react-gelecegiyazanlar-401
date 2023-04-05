import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Box, Text, Button } from '@chakra-ui/react'
import { fetchProductDetailPost } from '../../api'
import moment from 'moment'
import ImageGallery from 'react-image-gallery';
import { useBasket } from '../../context/BasketContext'

function ProductDetail() {

  const { product_id } = useParams()
  const { items, addToBasket } = useBasket()


  const { isLoading, error, data } = useQuery(['product', product_id], () => fetchProductDetailPost(product_id))

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  //console.log(data) // veritabanindan cektigimiz urun

  const images = data.photos.map(url => ({ original: url }))

  //console.log(images) // urunun resimleri

  const findBasketItem = items.find((item) => item._id == product_id.toString()) // basketten(sepetten) gelen urun ile gosterdigimiz urun ayni ise urunun kendisini doner
  // yani urunun daha once sepete eklenip eklenmedigini buluyoruz
  //console.log(findBasketItem) // eger urun yoksa undefined doner

  return (
    <div>
      <Button colorScheme={findBasketItem ? 'pink' : 'green'} onClick={() => addToBasket(data, findBasketItem)}>  {/** sepete eklem metoduna urunun varliginin degerini de gonderiyoruz. Sonra metod icerisinde eger findBasketItem, undefined donerse sepete eklemek yerine sepetten siler */}
        {!findBasketItem  // eger bir urun yoksa Add To Basket yazar varsa Remove Item yazar butona
          ? 'Add to basket'
          : 'Remove from basket'
        }
      </Button>
      <Text as='h2' fontSize='2xl'>{data.title}</Text>
      <Text>{moment(data.createdAt).format('DD/MM/YYYY')}</Text>
      <p>
        {data.description}
      </p>
      <Box margin='10'>
        <ImageGallery items={images} />
      </Box>

    </div >
  )
}

export default ProductDetail