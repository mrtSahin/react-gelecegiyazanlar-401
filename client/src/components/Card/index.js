import { Box, Image, Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useBasket } from '../../context/BasketContext'

function Card({ item }) {
  
  const {addToBasket, items} = useBasket()

  const findBasketItem = items.find(basketItem=>basketItem._id === item._id)// basketten(sepetten) gelen urun ile gosterdigimiz urun ayni ise urunun kendisini doner
  // yani urunun daha once sepete eklenip eklenmedigini buluyoruz
  //console.log(findBasketItem) // eger urun yoksa undefined doner
  
  return (
    <Box borderWidth="1px" borderRadius='lg' overflow='hidden' padding='3'> {/** Chakra nin div i olarak düşünebiliriz */}
      <Link to={`/product/${item._id}`}>
        <Image src={item.photos[0]} alt='product' loading='lazy' />
        <Box p='6'> {/** padding i p seklinde de ekleyebiliriz */}
          <Box d='flex' alignItems='baseline'>{/** display i d seklinde de ekleyebiliriz */}
            {moment(item.createdAt).format('DD//MM/YYYY')}
            <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight'> {/** mt = margin top   as='h4' bunu bir h4 olarak kullan */}
              {item.title}
            </Box>
            <Box>{item.price}</Box>
          </Box>
        </Box>
      </Link>
      <Button colorScheme={findBasketItem ? 'pink' : 'green'} onClick={() => addToBasket(item, findBasketItem)}>  {/** sepete eklem metoduna urunun varliginin degerini de gonderiyoruz. Sonra metod icerisinde eger findBasketItem, undefined donerse sepete eklemek yerine sepetten siler */}
        {!findBasketItem  // eger bir urun yoksa Add To Basket yazar varsa Remove Item yazar butona
          ? 'Add to basket'
          : 'Remove from basket'
        }
      </Button>
    </Box>
  )
}

export default Card