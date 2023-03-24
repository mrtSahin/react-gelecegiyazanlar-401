import React from 'react'
import Card from '../../components/Card'
import { Grid } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { fetchProductPost } from '../../api.js'

function Products() {
  const { isLoading, error, data } = useQuery('products',fetchProductPost )// 'products' bu aslında bir key

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  //console.log('data', data)
  return (
    <div>
      <Grid templateColumns='repeat(3, 1fr)' gap={4}>  {/* templateColumns='repeat(bir satirda kac tane gosterilecek, 1fr)'    */}
        {
          data.map((item, key) => <Card key={key} item={item} />)
        }
      </Grid>
    </div>
  )
}

export default Products
