import React, { useRef, useState } from 'react'
import { useBasket } from '../../context/BasketContext'
import {
  Alert,
  Box,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { postOrder } from '../../api'

function Basket() {
  const { items, emptyBasket, removeFromBasket } = useBasket()

  const totalPrice = items.reduce((acc, item) => acc + item.price, 0)

  const { isOpen, onOpen, onClose } = useDisclosure() // modal icin gerekli seyler
  const initialRef = useRef(null)

  const [address, setAddress] = useState('')
  //console.log('address', address)

  const handleSubmitForm = async () => {
    //console.log('submit')
    const itemIds = items.map((item) => item._id) // urunlerin idlerini aldik

    const input = { // siparis icin backend e gondermemiz gereken veri
      address,
      items: JSON.stringify(itemIds)
    }

   
    await postOrder(input)
    // const response = await fetchOrder(input)
    // console.log('RESPONSE', response)
    // console.log(itemIds)
    onClose() // siparisi verdikten sonra adres kisminin acik kalmamsi icin bu metidu burda cagirarak modal ekranini kapatiyoruz
    emptyBasket() // ayni anda siparisi verdikten sonra sepetin bosaltilmasi gerekir.
  }


  return (
    <div>
      {
        items.length < 1 // urun sayisi 1 den azsa uyari goster
          ? <Alert status='warning'>You have any items in your basket</Alert>
          : <Box pl={10}>
            {
              items.map(item => (
                <li key={item._id} style={{ listStyleType: 'ordered', marginBottom: '15px' }}>
                  <Link to={`/product/${item._id}`}>
                    {item.title} - {item.price}
                    <Image
                      htmlWidth={200}
                      src={item.photos[0]}
                      loading='lazy'
                      alt='basket item'
                    />
                  </Link>

                  <Button mt='2' size='sm' colorScheme='pink' onClick={() => { removeFromBasket(item) }}>
                    Remove from basket
                  </Button>
                </li>
              ))
            }
            <Box mt='10' fontSize={22}>Total: {totalPrice} TL</Box>


            <Button mt='2' size='sm' colorScheme='green' onClick={onOpen}>Order</Button>

            <Modal
              initialFocusRef={initialRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>

                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Textarea ref={initialRef} placeholder='Address' value={address} onChange={(e) => { setAddress(e.target.value) }} />
                  </FormControl>

                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={handleSubmitForm}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>

              </ModalContent>
            </Modal>
          </Box>



      }


    </div>
  )
}

export default Basket