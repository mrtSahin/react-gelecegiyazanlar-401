import React from 'react'
import Card from '../../components/Card'
import { Box, Button, Flex, Grid } from '@chakra-ui/react'
import { useInfiniteQuery } from 'react-query'
import { fetchProductPost } from '../../api.js'

function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery('products', fetchProductPost,
    { // sonsuz kere urun gosterebilmek icin useInfiniteQuery kullaniyoruz
      getNextPageParam: (lastGruop, allGroups) => {
        const morePagesExist = lastGruop?.length === 12 // son grubun uzunlugu 12 e esitmi
        // 12 den buyuklugunu kontrol etmiyoruz cunku api bize en fazla 12 tane veri donuyor

        if (!morePagesExist) {
          return
        }
        return allGroups.length + 1
      }  // sayfa numarasini kontrol edebilmek icin fonksiyon
    })// 'products' bu aslında bir key

  if (status === 'loading') return `Loading${status}`

  if (error) return 'An error has occurred: ' + error.message

  console.log('data', data)
  return (
    <div>
      <Grid templateColumns='repeat(3, 1fr)' gap={4}>  {/* templateColumns='repeat(bir satirda kac tane gosterilecek, 1fr)'    */}
        {
          data.pages.map((group, index) => ( // her bir veriye group diyoruz
            <React.Fragment key={index}>
              {
                group.map(item => (
                  <Box w='100%' key={item._id}>
                    <Card item={item}></Card>
                  </Box>
                ))
              }
            </React.Fragment>
          ))
        }
      </Grid>

      {/** read more kismi */}
      <Flex mt='10' justifyContent='center'>
        <Button
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </Button>
      </Flex>
    </div>
  )
}

export default Products
