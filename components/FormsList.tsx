import { Box, Flex, Skeleton, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { getApiData } from '../utils/services'

const FormsList = () => {
    const [forms, setForms] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const getForms = async() => {
        const data = await getApiData(
            'api/form',
            'GET',
            setIsLoaded,
        )

        setForms(data)
    }

    useEffect(() => {
        getForms()
    }, [])

  return (
    <>
        { isLoaded ? 
        forms?.map(form => (
            <Flex 
                justifyContent='space-between' 
                bg='white' 
                shadow='xs' 
                p='4' 
                mb='5'
                borderRadius='10' 
                _hover={{ shadow: 'md' }} 
                key={form?.id}
            >
                <Box>
                    <Text>{ form?.title }</Text>
                </Box>
                <Box>
                    <Text>{ form?.updated_at }</Text>
                </Box>
                <Box>
                    <Text>{ form?.published ? 'Active' : 'Disabled' }</Text>
                </Box>
                <Box>
                    <Link href={`/admin/create-form/${form?.id}`}>
                        <FiEdit2 />
                    </Link>
                </Box>
            </Flex>
            )) 
        :
        ( <>
                <Flex 
                    justifyContent='space-between' 
                    bg='white' 
                    shadow='xs' 
                    p='4' 
                    mb='5'
                    borderRadius='10' 
                    gap='50'
                >
                    <Skeleton
                        height='25px'
                        isLoaded={isLoaded}
                        fadeDuration={4}
                        flex='1'
                    />
                    <Skeleton
                        height='25px'
                        isLoaded={isLoaded}
                        fadeDuration={4}
                        flex='1'
                    />
                    <Skeleton
                        height='25px'
                        isLoaded={isLoaded}
                        fadeDuration={4}
                        flex='1'
                    />
                    <Skeleton
                        height='25px'
                        isLoaded={isLoaded}
                        fadeDuration={4}
                        flex='1'
                    />
                </Flex>
                <Flex 
                    justifyContent='space-between' 
                    bg='white' 
                    shadow='xs' 
                    p='4' 
                    mb='5'
                    borderRadius='10'
                    gap='50' 
                >
                    <Skeleton
                        height='25px'
                        isLoaded={isLoaded}
                        fadeDuration={4}
                        flex='1'
                    />
                    <Skeleton
                        height='25px'
                        isLoaded={isLoaded}
                        fadeDuration={4}
                        flex='1'
                    />
                    <Skeleton
                        height='25px'
                        isLoaded={isLoaded}
                        fadeDuration={4}
                        flex='1'
                    />
                    <Skeleton
                        height='25px'
                        isLoaded={isLoaded}
                        fadeDuration={4}
                        flex='1'
                    />
            </Flex>
            <Flex 
                justifyContent='space-between' 
                bg='white' 
                shadow='xs' 
                mb='5'
                p='4' 
                borderRadius='10' 
                gap='50'
            >
                <Skeleton
                    height='25px'
                    isLoaded={isLoaded}
                    fadeDuration={4}
                    flex='1'
                />
                <Skeleton
                    height='25px'
                    isLoaded={isLoaded}
                    fadeDuration={4}
                    flex='1'
                />
                <Skeleton
                    height='25px'
                    isLoaded={isLoaded}
                    fadeDuration={4}
                    flex='1'
                />
                <Skeleton
                    height='25px'
                    isLoaded={isLoaded}
                    fadeDuration={4}
                    flex='1'
                />
            </Flex>
        </>
        )
        }
    </>
  )
}

export default FormsList