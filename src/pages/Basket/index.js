import  {useRef, useState} from 'react'

import { useBasket } from '../../Context/BasketContext'
import { Alert, Image, Button, Box, Text,
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
        Textarea
 } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { postOrder } from '../../api'

function Basket({item, _id}) {

    const { removeFromBasket, items, emptyBasket } = useBasket()

    const { isOpen, onOpen, onClose } = useDisclosure()  
    const initialRef = useRef()
    const [address, setAddress] = useState('')
    const handleSubmitForm = async () => {
        const itemIds = items.map((item) => item._id)
        console.log(itemIds);

        const input = {
            address,
            items: JSON.stringify(itemIds)

        }

        const response = await postOrder(input)
        emptyBasket()
        onClose()
        console.log(response);

    }

    const total = items.reduce((acc, obj) => acc + obj.price, 0)  // toplama işlemi için

  return (
    <div>
        {
            items.length < 1 && (
            <Alert status='warning'>You have not any items in your basket</Alert>
        )}

        {
            items.length > 0 && (
                <>
                    <ul style={{margin: '20px', listStyleType: 'decimal'}}>
                        {
                            items.map((item) => 
                            <li key={item._id} style={{fontSize: '20px'}}>
                                <Link to={`/product/${item._id}`}>
                                    
                                    {item.title} - {item.price} TL 
                                    <br/>
                                    
                                    <Image width={300} src={item.photos[0]}/>
                                    <br/>
                                    
                                </Link>
                                <Button mb={10} colorScheme='orange' onClick={() => removeFromBasket(item._id)}>
                                    Remove from basket
                                </Button>

                            </li>)
                        }

                    <Box mt={12}>
                       <Text fontSize={24}>Total :  {total} TL </Text> 
                    </Box>
                    </ul>


        <Button mt={2} colorScheme='green' onClick={onOpen}> Order </Button>
        <Modal
        initialFocusRef={initialRef}
       
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Textarea ref={initialRef} placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)}/>
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
                </>

            )
        }


                   


    </div>
  )
}

export default Basket
