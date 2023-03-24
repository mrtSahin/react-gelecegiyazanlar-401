

import { Box, Image, Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

function Card({item}) {
  return (
    <Box borderWidth="1px" borderRadius='lg' overflow='hidden' padding='3'> {/** Chakra nin div i olarak düşünebiliriz */}
      <Link to={`/product/${item._id}`}>
        <Image src={item.photos[0]} alt='product' loading='lazy'/>
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
      <Button colorScheme='pink'>
        Add to basket
      </Button>
    </Box>
  )
}

export default Card