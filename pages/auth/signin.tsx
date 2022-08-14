import {
    Box,
    Button,
    Checkbox,
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
    IconButton,
    InputGroup,
    InputRightElement
  } from '@chakra-ui/react'
import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { FormEventHandler, useState } from 'react'
  
export const SignIn: NextPage = ():JSX.Element => {
    const [email, setEmail] = useState('')

    const handleSubmit: FormEventHandler<HTMLFormElement> = async () => {
      await signIn('email', {
          email,
          redirect: false
      })
    }

    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
          <Stack spacing="8">
            <Stack spacing="6">
              <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
                  Log in to your account
                </Heading>
                <HStack spacing="1" justify="center">
                  <Text color="muted">Don't have an account?</Text>
                  <Button variant="link" colorScheme="blue">
                    Sign up
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
    
                {/* Email */}
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </FormControl>
                </Stack>

                <Stack spacing="6">
                  <Button variant="primary" onClick={handleSubmit}>Sign in</Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )
  }

  export default SignIn