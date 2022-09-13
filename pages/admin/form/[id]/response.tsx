import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import FormNavigation from '../../../../components/FormNavigation'
import AdminLayout from '../../../../layouts/AdminLayout'
import { getApiData } from '../../../../utils/services'

const Response = () => {
    const [formResponses, setFormResponses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    
    const router = useRouter()
    const { id: form_id } = router.query
    
    const getFromResponses = async () => {
        const data = await getApiData(
        `api/response/?form_id=${form_id}`,
        'GET',
        setIsLoaded
        )

        if(data?.length > 0) {
            setFormResponses(data)
        }
    }

    useEffect(() => {
        if(form_id) {
            getFromResponses()
        }
    }, [form_id])

    const tableHeader: string[] = formResponses?.length > 0 ? Object.keys(formResponses?.[formResponses.length - 1]?.content) : []
    const tableValues = formResponses?.length > 0 ? formResponses?.map(response => Object.values(response?.content)) : []

  return (
    <AdminLayout>
        <FormNavigation />
        <TableContainer>
            <Table variant='striped' colorScheme='teal'>
                <Thead>
                <Tr>
                    { tableHeader?.length > 0 && tableHeader?.map((column: string) => (
                            <Th key={column}>{ column }</Th>
                        )) 
                    }
                </Tr>
                </Thead>
                <Tbody>
                    { tableValues?.length > 0 && tableValues?.map((field) => (
                        <Tr key={field}>
                            <Td>{ field }</Td>
                        </Tr>
                    )) 
                    }
                </Tbody>
            </Table>
        </TableContainer>
    </AdminLayout>
  )
}

export default Response