import React from 'react'
import Card from '../../components/Card'
import { Grid } from '@chakra-ui/react'
import { useQuery } from 'react-query'

function Products() {
  const { isLoading, error, data } = useQuery('repoData', () =>
     fetch('http://localhost:4000/product?page=1').then(res =>
       res.json()
     )
   )
 
   if (isLoading) return 'Loading...'
 
   if (error) return 'An error has occurred: ' + error.message

   console.log('data', data)
  return (
    <div>Products
      <Grid templateColumns='repeat(4, 1fr)' gap={4}>  {/* templateColumns='repeat(bir satirda kac tane gosterilecek, 1fr)'    */}
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Grid>
    </div>
  )
}

export default Products
