import { useNavigate } from "react-router"
import { useAuth } from "../../../context/AuthContext"
import { useFormik } from "formik"
import { fetchLogin } from "../../../api"
import { validate } from "./validations"
import { Alert, Box, Button, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react"


function SignIn() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({ email: values.email, password: values.password })
        console.log(loginResponse)
        login(loginResponse)
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
            <Heading> Sign In </Heading>
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
                  name='password'
                  type='password'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}

                />
              </FormControl>

              
              
              <Button mt='4' width='full' type='submit'>Sign In</Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default SignIn