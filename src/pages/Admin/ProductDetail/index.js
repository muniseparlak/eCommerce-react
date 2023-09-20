import React from 'react'
import { useParams } from 'react-router-dom'

import { fetchProduct, updateProduct } from '../../../api'
import { useQuery } from 'react-query'
import { Formik, FieldArray, Field } from 'formik'
import { Text, Box, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react'
import { message } from 'antd'

import editScheme from './validations'


function ProductDetail() {

    const { product_id } = useParams()
    
    const { isLoading, isError, data, error } = useQuery(['admin: product', product_id],
    () =>  fetchProduct(product_id) )

    if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  console.log('data', data)

  const handleSubmit = async (values, bag) => {

    console.log('submitted');
    message.loading({content: 'loading...', key: 'product_update'})

    try {
        await updateProduct(values, product_id)
        message.success({content: 'The product successfully updated', 
         key:'product_update',
        duration: 2})
    } catch (e) {
        message.error({content: 'The product does not updated'})
    }
  }

  return (
    <div>
     <Text fontSize='2xl'>Edit</Text>

     <Formik
        initialValues={{
            title: data.title,
            description: data.description,
            photos: data.photos,
            price: data.price
        }}
        validationSchema={editScheme}
        onSubmit={handleSubmit}
     >
        {
        ({ handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
            <Box>
                <Box my='5' textAlign='left'>
                 <form onSubmit={handleSubmit}>
                 <FormControl mt='4'>
                        <FormLabel>Title</FormLabel>
                        <Input
                        name= 'title'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        disabled={isSubmitting}
                        isInvalid={touched.title && errors.title}
                        />
                    </FormControl>
                    
                    <FormControl mt='4'>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                        
                        name= 'description'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        disabled={isSubmitting}
                        isInvalid={touched.description && errors.description}
                        />
                    </FormControl>
                    <FormControl mt='4'>
                        <FormLabel>Price</FormLabel>
                        <Input
                        name= 'price'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        disabled={isSubmitting}
                        isInvalid={touched.price && errors.price}
                        />
                    </FormControl>
                    <FormControl mt='4'>
                        <FormLabel>Photos</FormLabel>
                        <FieldArray
                        name= 'photos'
                        render={(arrayHelpers) =>  (
                            <div>
                                {
                                    values.photos && values.photos.map((photo, index) => (
                                        <div key={index}>
                                            <Input
                                            name={`photos.${index}`} 
                                            value={photo}
                                            disabled= {isSubmitting}
                                            onChange={handleChange}
                                            width='3xl'
                                            />
                                            <Button ml='4' colorScheme='pink'
                                            onClick={() => arrayHelpers.remove(index)}>
                                                Remove</Button>
                                        </div>
                                 ))}
                                 <Button mt='4' colorScheme='green'
                                            onClick={() => arrayHelpers.push('')}>
                                                Add a photo</Button>
                            </div>

                        )}
                        />
                    </FormControl>
                   
                    <Button mt='4' width={'full'} type='submit'>
                                               Update</Button>
                 </form>
                </Box>
            </Box>
        )
        }
       

     </Formik>
    </div>
  )
}

export default ProductDetail
