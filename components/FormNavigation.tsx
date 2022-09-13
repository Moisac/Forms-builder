import { Box, Center } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const style = {
    link: {
        backgroundColor: 'red'
    }
}

const FormNavigation = () => {
    const router = useRouter()
    const { id: form_id } = router.query

    const handleActiveLink = (page: string) => {
        if(router?.route.includes(page)) {
            return true
        }

        return false
    }

  return (
    <Center p='3' mb='5'>
        <Box 
            bg={handleActiveLink('create') ? 'teal' : ''} 
            color={handleActiveLink('create') ? 'white' : 'black'} 
            borderRadius='5' px='2' py='1' m='3'
        >
            <Link href={`/admin/form/${form_id}/create`}>Create</Link>
        </Box>
        <Box 
            bg={handleActiveLink('response') ? 'teal' : ''} 
            color={handleActiveLink('response') ? 'white' : 'black'} 
            borderRadius='5' px='2' py='1' m='3'
        >
            <Link href={`/admin/form/${form_id}/response`}>Responses</Link>
        </Box>
    </Center>
  )
}

export default FormNavigation