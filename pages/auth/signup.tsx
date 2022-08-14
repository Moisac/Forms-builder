import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
  } from '@chakra-ui/react'
import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { FormEventHandler, useState } from 'react'
import SiteLayout from '../../layouts/SiteLayout'
import AuthPrivateRoute from '../../routes/AuthPrivateRoute'
  
export const SignUp: NextPage = ():JSX.Element => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const handleSubmit: FormEventHandler<HTMLFormElement> = async () => {

        const res = await signIn('email', {
            email,
            name,
            redirect: false
        })
    }

    return (
      <SiteLayout>
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
          <Stack spacing="8">
            <Stack spacing="6">
              <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
                  Create new account
                </Heading>
                <HStack spacing="1" justify="center">
                  <Text color="muted">Have already an account?</Text>
                  <Button variant="link" colorScheme="blue">
                    Sign in
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Box
              py={{ base: '0', sm: '8' }}
              px={{ base: '4', sm: '10' }}
              bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
              boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
              borderRadius={{ base: 'none', sm: 'xl' }}
            >
              <Stack spacing="6">
                <Stack spacing="5">
                  {/* Name */}
                  <FormControl>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input id="fist_name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                  </FormControl>

                  {/* Email */}
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </FormControl>

                </Stack>
                <Stack spacing="6">
                  <Button variant="primary" onClick={handleSubmit}>Sign up</Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </SiteLayout>
      )
  }

  export default AuthPrivateRoute(SignUp)