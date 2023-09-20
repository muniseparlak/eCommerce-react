import React from 'react'

import { postProduct, updateProduct } from '../../../api'
import {  QueryClient, useMutation, useQueryClient } from 'react-query'
import { Formik, FieldArray, Field } from 'formik'
import { Text, Box, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react'
import { message } from 'antd'

import newScheme from './validations'


function NewProduct() {

    const queryClient = useQueryClient()

    const newProductMutation = useMutation(postProduct, {
        onSuccess: () => queryClient.invalidateQueries("admin: products")
    })

  const handleSubmit = async (values, bag) => {
    message.loading({content: 'loading...', key: 'product_update'})

    const newValues = {
        ...values,
       photos: JSON.stringify(values.photos)
    }
    newProductMutation.mutate(newValues, {
        onSuccess: () => {
            console.log('success');
        }
    })
   
  }

  return (
    <div>
     <Text fontSize='2xl'>New Product</Text>

     <Formik
        initialValues={{
            title: "",
            description: "",
            photos: "",
            price: []
        }}
        validationSchema={newScheme}
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
                                {values.photos && 
                                    values.photos.map((photo, index) => (
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
                                               Save</Button>
                 </form>
                </Box>
            </Box>
        )
        }
       

     </Formik>
    </div>
  )
}

export default NewProduct

