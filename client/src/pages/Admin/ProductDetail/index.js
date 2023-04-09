import React from 'react'
import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import { fetchProductDetailPost, updateProduct } from '../../../api'
import { Box, Button, FormControl, FormLabel, Input, Text, Textarea } from '@chakra-ui/react'
import { FieldArray, Formik } from 'formik'
import { validationSchema } from './validations'
import { message } from 'antd'

function ProductDetail() {
  const { product_id } = useParams()

  const { data, isLoading, isError, error } = useQuery(['admin:product', product_id], () => fetchProductDetailPost(product_id))

  isLoading && <div>Loading..</div>
  isError && <div>Error {error.message}</div>
  if (data == undefined) {
    return <div>undefined</div>
  }
  console.log(product_id)
  console.log(data)

  const handleSubmit = async (values, bag) => {
    //console.log('submittied');
    message.loading({ content: 'Loading...', key: "product_update" })
    try {
      await updateProduct(values, product_id)
      message.success({
        content: "The product successfully updated",
        key: 'prodcut_update',
        duration: 2
      })
    } catch (e) {
      message.error("The product does not updated.")
    }

  }

  return (
    <div>
      <Text fontSize="2xl">Edit</Text>
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          photos: data.photos
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {

          ({ handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
            <>

              <Box>
                <Box my='5' textAlign='left'>
                  <form onSubmit={handleSubmit}>
                    <FormControl>
                      <FormLabel>Title</FormLabel>
                      <Input
                        name='title'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        disabled={isSubmitting}
                        isInvalid={touched.title && errors.title}
                      />
                      {touched.title && errors.title && <Text color='red'>{errors.title}</Text>}
                    </FormControl>

                    <FormControl mt='4'>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        name='description'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        disabled={isSubmitting}
                        isInvalid={touched.description && errors.description}
                      />
                      {touched.description && errors.description && <Text color='red'>{errors.description}</Text>}
                    </FormControl>
                    <FormControl mt='4'>
                      <FormLabel>Price</FormLabel>
                      <Input
                        name='price'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        disabled={isSubmitting}
                        isInvalid={touched.price && errors.price}
                      />
                      {touched.price && errors.price && <Text color='red'>{errors.price}</Text>}
                    </FormControl>
                    <FormControl mt='4'>
                      <FormLabel>Photos</FormLabel>
                      <FieldArray

                        name='photos'
                        render={(arrayHelpers) => (
                          <div>
                            {
                              values.photos && values.photos.map((photo, index) => (
                                <div key={index}>
                                  <Input
                                    name={`photos.${index}`}
                                    value={photo}
                                    mt='2'
                                    width='3xl'
                                    disabled={isSubmitting}
                                    onChange={handleChange}
                                  />
                                  <Button
                                    marginBottom='2'
                                    ml='4'
                                    type="button"
                                    colorScheme='red'
                                    onClick={() => arrayHelpers.remove(index)}
                                  >Remove</Button>
                                </div>
                              ))
                            }
                            <Button mt='5' onClick={() => arrayHelpers.push('')}>
                              Add a Photo
                            </Button>
                          </div>
                        )}
                      />
                    </FormControl>
                    <Button mt='4' width='full' type='submit' isLoading={isSubmitting}>
                      Update
                    </Button>
                  </form>
                </Box>
              </Box>
            </>
          )
        }

      </Formik>
    </div>
  )
}

export default ProductDetail