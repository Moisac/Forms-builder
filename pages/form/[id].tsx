import { Box, Button, Container, Heading, Text, IconButton } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import DynamicInput from '../../components/DynamicInput'
import SiteLayout from '../../layouts/SiteLayout'
import { getApiData } from '../../utils/services'
import { BsCheckLg } from 'react-icons/bs';

const SingleForm = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [formInfo, setFormInfo] = useState({})
    const [formResponse, setFormResponse] = useState({} as Object)
    const [formSubmitted, setFormSubmitted] = useState(false)

    const router = useRouter()
    const { id: form_id } = router.query

    const getFormById = async() => {
        const data = await getApiData(
            `api/form/${form_id}`,
            'GET',
            setIsLoaded
        )

        setFormInfo(data)
    }

    const handleUpdateInput = (name: string, value: unknown) => {
      setFormResponse({
        ...formResponse,
        [name]: value
      })
    }

    const handleSubmitResponse = async () => {
      const formContent = {
        formId: form_id,
        content: formResponse
      }
      const data = await getApiData(
        `api/response`,
        'POST',
        setIsLoaded,
        formContent
    )

    if(data?.id) {
      setFormSubmitted(true)
    }

    }

    useEffect(() => {
        if(form_id) {
          getFormById()
        }
    }, [form_id])
    
  return (
    <SiteLayout>
        <Container maxW='container.lg' py={25}>
          { formSubmitted ?
            (
              <Box textAlign="center" py={10} px={6}>
                <IconButton
                  variant='solid'
                  colorScheme='green'
                  aria-label='Submit successfully'
                  borderRadius={50}
                  icon={<BsCheckLg />}
                />
                  <Heading as="h2" size="xl" mt={6} mb={2}>
                    Form submitted successfully
                  </Heading>
                  <Text color={'gray.500'}>
                    Thanks for taking your time to submit this form.
                  </Text>
                </Box>
            )
            :
            (
              <form>
                { formInfo?.questions && formInfo?.questions?.map((question, index) => (
                      <DynamicInput 
                        model={question?.options} 
                        inputType='text' key={index} 
                        handleUpdateInput={handleUpdateInput}
                      />
                    )) 
                  }
                  <Button
                    colorScheme='messenger'
                    variant='solid'
                    onClick={handleSubmitResponse}
                  >Submit</Button>
            </form>
            )
        }
        </Container>
    </SiteLayout>
  )
}

export default SingleForm