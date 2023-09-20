import { Button, Box, Image, border } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import moment  from 'moment'

import React from 'react'
import { useBasket } from '../../Context/BasketContext';

function Card({item}) {


  const { addToBasket, items} = useBasket()
  const findBasketItem = items.find(
    (basketItem) => basketItem._id === item._id)

  return (
    <div>
     <Box borderWidth="1px" overflow="hidden" p="3">
        <Link to={`/product/${item._id}`} >
        <Image style={{borderRadius: '5px'}} src={item.photos[0]}/>

        <Box p="6">
            <Box d="flex" alignItems="baseline">
                {moment(item.createdAt).format('DD/MM/YYYY')}
            </Box>
            <Box mt="1" fontWeight="semibold" as='h3' lineHeight="tight">
               {item.title}
            </Box>
            <Box >
                {item.price}
            </Box>
        </Box>

        </Link>
        <Button colorScheme={ findBasketItem ? 'orange' : 'pink'} variant='solid' onClick={() => addToBasket(item, findBasketItem)}> 
          {
            findBasketItem ? 'Remove from basket' : 'Add to basket' 
          }
         </Button>
     </Box>
    </div>
  )
}

export default Card
