import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Badge, Box, Button, Container, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, Flex, IconButton, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure, useToast } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import FormTitle from '../../../../components/FormTitle'
import AdminLayout from '../../../../layouts/AdminLayout'
import { FiSettings } from 'react-icons/fi'
import ManageQuestion from '../../../../components/ManageQuestion'
import DynamicInput from '../../../../components/DynamicInput'
import { getApiData } from '../../../../utils/services'
import { AiOutlineDelete } from 'react-icons/ai'
import FormNavigation from '../../../../components/FormNavigation'

const CreateForm: NextPage = (): JSX.Element => {
  const [formInfo, setFormInfo] = useState({})
  const [formTitle, setFormTitle] = useState(null)
  const [isLoaded, setIsLoaded ] = useState(false)
  const [selectedType, setSelectedType] = useState({})

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete} = useDisclosure()
  const btnRef = React.useRef()

  const router = useRouter()
  const toast = useToast()
  const { id: form_id } = router.query
  const cancelRef = useRef()

  const getFormById = async() => {
    const data = await getApiData(
      `api/form/${form_id}`,
      'GET',
      setIsLoaded
    )

    setFormInfo(data)
  }

  const handleUpdateStatus = async () => {
    const updatedForm = {
      published: !formInfo?.published
    }

    const data = await getApiData(
      `api/form/${form_id}`,
      'PATCH',
      setIsLoaded,
      updatedForm
    )

    if(!!data?.id) {
      getFormById()
    }
  }

  const handleUpdateTitle = async () => {
    const updatedForm = {
      title: formTitle
    }

    await getApiData(
      `api/form/${form_id}`,
      'PATCH',
      setIsLoaded,
      updatedForm
    )

  }

  const handleEditQuestion = (question) => {
    setSelectedType(question)
  }

  const handleDeleteQuestion = async (questionId) => {
    const updatedQuestions = formInfo?.questions?.filter(question => question?.id !== questionId)
    const updatedForm = {
      questions: [ ...updatedQuestions ]
    }
    
    const data = await getApiData(
      `api/form/${form_id}`,
      'PATCH',
      setIsLoaded,
      updatedForm
    )

    if(!!data?.id) {
      onCloseDelete()
      toast({
        title: 'Question was successfully deleted',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top'
      })
      getFormById()
    }

  }

useEffect(() => {
  if(form_id) {
    getFormById()
  }
}, [form_id])

  return (
    <AdminLayout>
        <FormNavigation />
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen} leftIcon={<FiSettings />}>
          Edit form
        </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='sm'
      >
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit form</DrawerHeader>

          <DrawerBody>
          <Tabs variant='soft-rounded' colorScheme='messenger'>
            <TabList>
              <Tab>Questions</Tab>
              <Tab>Theme</Tab>
              <Tab>Settings</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                { formInfo?.questions && formInfo?.questions?.map((question, index) => (
                  <Flex 
                    key={index} 
                    background='gray.100'
                    my='2'
                    p='2'
                    borderRadius='5'
                    justifyContent='space-between'
                  >
                    <Badge 
                      colorScheme={question?.badgeColor}
                      p='1'
                      borderRadius='5'
                    >
                      { question?.type }
                    </Badge>
                    <b>{ question?.options?.name }</b>
                    <Box>
                       <ManageQuestion 
                        selectedType={selectedType} 
                        setSelectedType={setSelectedType}
                        fromInfo={formInfo}
                        actionType='edit'
                        handleEditQuestion={() => handleEditQuestion(question)}
                        setFormInfo={setFormInfo}
                      />
                       <IconButton
                        variant='link'
                        colorScheme='red'
                        aria-label='Delete'
                        fontSize='14px'
                        p='1'
                        icon={<AiOutlineDelete />}
                        onClick={onOpenDelete}
                      />
                    </Box>

                    <AlertDialog
                      isOpen={isOpenDelete}
                      leastDestructiveRef={cancelRef}
                      onClose={onCloseDelete}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete question
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure you want to delete this question?
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onCloseDelete}>
                              Cancel
                            </Button>
                            <Button colorScheme='red' ml={3} onClick={() => handleDeleteQuestion(question?.id)}>
                              Delete
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </Flex>
                )) 
              }
  
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
          </DrawerBody>

          <DrawerFooter>
          <ManageQuestion 
            selectedType={selectedType} 
            setSelectedType={setSelectedType}
            fromInfo={formInfo}
            actionType='add'
            setFormInfo={setFormInfo}
          />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    
        <Button 
          colorScheme={formInfo?.published ? 'red' : 'messenger'} 
          variant='solid' 
          mr='4'
          float='right'
          onClick={handleUpdateStatus}
      >
        { formInfo?.published ? 'Unpublish' : 'Publish'}
      </Button>
 
        <Container maxW='container.lg'>
          <div>CreateForm</div>
          <FormTitle 
            formTitle={formInfo?.title} 
            setFormTitle={setFormTitle} 
            handleUpdateTitle={handleUpdateTitle}
          />
          
          { formInfo?.questions && formInfo?.questions?.map((question, index) => (
            <DynamicInput model={question?.options} inputType='text' key={index} />
            )) 
          }
        </Container>
      </AdminLayout>
    )
}

export default CreateForm