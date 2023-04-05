import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Alert } from '@chakra-ui/react'
import React from 'react'
import { useFormik } from 'formik'
import { validate } from './validations'
import { fetchRegister } from '../../../api'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router'



function SignUp() {

  const { login } = useAuth()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: ''
    },
    onSubmit: async (values, bag) => {
      console.log('lahavle')
      try {
        const registerResponse = await fetchRegister({ email: values.email, password: values.password })
        console.log(registerResponse)
        login(registerResponse)
        navigate('/profile')
      } catch (e) {
        bag.setErrors({ general: e.response.data.message }) // custom hata olusturduk
        console.log(e)
      }
    },
    validationSchema: validate
  })



  return (
    <div>
      <Flex
        align='center'
        width='full'
        justifyContent='center'
      >
        <Box pt={10}>
          <Box textAlign='center'>
            <Heading> Sign Up </Heading>
          </Box>
          <Box my='5px'>
            {
              formik.errors.general &&
              <Alert status='error'>
                {formik.errors.general}
              </Alert>
            }
          </Box>
          <Box margin='5px' textAlign='left'>
            <form onSubmit={formik.handleSubmit}>

              <FormControl>
                <FormLabel>E-Mail</FormLabel>
                <Input
                
                  name='email'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
              </FormControl>

              <FormControl mt='4'>
                <FormLabel>Password</FormLabel>
                <Input
                autoComplete='true'
                  name='password'
                  type='password'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}

                />
              </FormControl>

              <FormControl mt='4'>
                <FormLabel>Password Confirm</FormLabel>
                <Input
                autoComplete='true'
                  name='passwordConfirm'
                  type='password'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                />
              </FormControl>
              <Button mt='4' width='full' type='submit'>Sign Up</Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default SignUp