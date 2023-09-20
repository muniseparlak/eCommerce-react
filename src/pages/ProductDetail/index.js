import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Box, Text, Button} from '@chakra-ui/react';
import moment from 'moment';
import ImageGallery from 'react-image-gallery'
import { useBasket } from '../../Context/BasketContext';

function ProductDetail() {

    const {product_id} = useParams()
    const { addToBasket, items } = useBasket()

    const { isLoading, error, data } = useQuery(['product', product_id], () =>
    fetch(`http://localhost:4000/product/${product_id}`).then(res =>
      res.json()
    )
  )

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  console.log('data', data)

  const images = data.photos.map((url) => ({original: url}))
  const findBasketItem = items.find((item) => item._id === product_id)

  return (
    <div>
      <Button colorScheme={ findBasketItem ? 'orange' : 'pink' } onClick={() => addToBasket(data, findBasketItem) }> 
     {findBasketItem ? 'Remove from basket' : 'Add to basket'}
     </Button>
      <Text as='h2' fontSize='2xl'>
        {data.title}
        </Text>
        <Text as='h3'>
        {moment(data.createdAt).format('DD/MM/YYYY')}
        </Text>
        <p>{data.description}</p>
        <Box margin='10'>
            <ImageGallery items={images}/>
        </Box>
    </div>
  )
}

export default ProductDetail
