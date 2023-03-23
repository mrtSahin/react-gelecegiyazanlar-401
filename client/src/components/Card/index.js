

import { Box, Image, Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Card() {
  return (
    <Box borderWidth="1px" borderRadius='lg' overflow='hidden' padding='3'> {/** Chakra nin div i olarak düşünebiliriz */}
      <Link to='#/'>
        <Image src='https://picsum.photos/300/300' alt='product' />
        <Box p='6'> {/** padding i p seklinde de ekleyebiliriz */}
          <Box d='flex' alignItems='baseline'>{/** display i d seklinde de ekleyebiliriz */}
            22.03.2023
            <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight'> {/** mt = margin top   as='h4' bunu bir h4 olarak kullan */}
              MacBook Pro
            </Box>
            <Box>100 TL</Box>
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