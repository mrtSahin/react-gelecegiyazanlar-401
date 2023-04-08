import React from 'react'
import './styles.css'
import { Link, Route, Routes } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Home from './Home/index'
import Orders from './Orders/index'
import Products from './Products/index'

function Admin() {
  return (
    <div>

      <nav>
        <ul className='admin-menu'>
          <li>
            <Link to='/admin'>Home</Link>
          </li>
          <li>
            <Link to='/admin/orders'>Orders</Link>
          </li>
          <li>
            <Link to='/admin/products'>Product</Link>
          </li>
        </ul>
      </nav>


      <Box mt="10">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Box>
    </div>
  )
}

export default Admin