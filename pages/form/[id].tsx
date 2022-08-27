import { Container } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import DynamicInput from '../../components/DynamicInput'
import SiteLayout from '../../layouts/SiteLayout'
import { getApiData } from '../../utils/services'

const SingleForm = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [formInfo, setFormInfo] = useState({})

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

    useEffect(() => {
        if(form_id) {
          getFormById()
        }
    }, [form_id])
    
  return (
    <SiteLayout>
        <Container maxW='container.lg' py={25}>
        { formInfo?.questions && formInfo?.questions?.map((question, index) => (
            <DynamicInput model={question?.options} inputType='text' key={index} />
            )) 
        }
        </Container>
    </SiteLayout>
  )
}

export default SingleForm