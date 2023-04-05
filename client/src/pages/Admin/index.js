import React from 'react'
import './styles.css'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Home from './Home'

function Admin() {

  const location=useLocation()
  console.log(location)
  return (
    <div>

      <nav>
        <ul className='admin-menu'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/'>Orders</Link>
          </li>
          <li>
            <Link to='/'>Product</Link>
          </li>
        </ul>
      </nav>


      <Box mt="10">
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Box>
    </div>
  )
}

export default Admin