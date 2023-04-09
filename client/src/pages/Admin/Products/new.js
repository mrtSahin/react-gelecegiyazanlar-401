import React from 'react';
import { Formik } from "formik";
import { Box, FormControl, FormLabel, Input, Text,Button } from '@chakra-ui/react';
import { useMutation, useQueryClient } from "react-query";
import validationSchema from "./validations.js";
import {message} from "antd";
import { postProduct } from '../../../api';

const NewProduct = () => {

    const queryClient = useQueryClient();
    const newProductMutation = useMutation(postProduct, {onSuccess: () => queryClient.invalidateQueries(["admin : products"])});
    const handleSubmit = async (values) => {
        console.log(values);
        message.loading({content:"Loading...", key:"product_update"});
        const newValues = {...values,photos : JSON.stringify(values.photos)}
        newProductMutation.mutate(newValues, {
            onSuccess : () => {
                message.success({
                    content : "The product succesfully updated",
                    key : "product_update",
                    duration : 2
                })
            }
        });
    };
    return (
        <div>
            <Text>New Product</Text>
            <Formik
                initialValues={{ title: "", description: "", price: "", photos: [] }}
                validationSchema={validationSchema} 
                onSubmit={handleSubmit}>
                {({handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting}) => (
                    <>
                        <Box>
                            <Box my="5" textAlign="left">
                                <form onSubmit={handleSubmit}>
                                    <FormControl>
                                        <FormLabel>Title</FormLabel>
                                        <Input name="title" onChange={handleChange} onBlur={handleBlur}
                                            value={values.title} disabled={isSubmitting} isInvalid={touched.title && errors.title} />
                                        {
                                            touched.title && errors.title && (<Text color="red.500">{errors.title}</Text>)
                                        }
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Description</FormLabel>
                                        <Input name="description" onChange={handleChange} onBlur={handleBlur}
                                            value={values.description} disabled={isSubmitting} isInvalid={touched.description && errors.description} />
                                        {
                                            touched.description && errors.description && (<Text color="red.500">{errors.description}</Text>)
                                        }
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Price</FormLabel>
                                        <Input name="price" onChange={handleChange} onBlur={handleBlur}
                                            value={values.price} disabled={isSubmitting} isInvalid={touched.price && errors.price} />
                                        {
                                            touched.price && errors.price && (<Text color="red.500">{errors.price}</Text>)
                                        }
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Photos</FormLabel>
                                        <Input name="photos" onChange={handleChange} onBlur={handleBlur}
                                            value={values.photos} disabled={isSubmitting} isInvalid={touched.photos && errors.photos} />
                                        {
                                            touched.photos && errors.photos && (<Text color="red.500">{errors.photos}</Text>)
                                        }
                                    </FormControl>
                                    <Button mt="4" width="full" type="submit" isLoading={isSubmitting}>Update</Button>
                                </form>

                            </Box>
                        </Box>
                    </>
                )}
            </Formik>
        </div>
    )
}

export default NewProduct;