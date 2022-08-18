import { Button, Container, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import FormTitle from '../../../components/FormTitle'
import AdminLayout from '../../../layouts/AdminLayout'
import { FiSettings } from 'react-icons/fi'
import AddQuestion from '../../../components/AddQuestion'
import DynamicInput from '../../../components/DynamicInput'

const CreateForm: NextPage = (): JSX.Element => {
  const [ showSidebar, setShowSidebar] = useState(true)
  const [formInfo, setFormInfo] = useState({})
  const [formTitle, setFormTitle] = useState(null)
  const [isLoaded, setIsLoaded ] = useState(false)
  const [selectedType, setSelectedType] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const router = useRouter()
  const { id: form_id } = router.query

  const getFormById = async() => {
    try {
        setIsLoaded(false)
        const data = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}api/form/${form_id}`)
        const json  = await data.json()
        setFormInfo(json)

    } catch(err) {
        console.error(err)
    } finally {
        setIsLoaded(true)
    }
  }

  const handleUpdateStatus = async () => {
    const updatedForm = {
      published: !formInfo?.published
    }

    try {
      // setIsLoaded(false)
      const data = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}api/form/${form_id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedForm)
      })
      const json  = await data.json()
      if(!!json?.id) {
        getFormById()
      }

    } catch(err) {
        console.error(err)
    } finally {
        // setIsLoaded(true)
    }
  }

useEffect(() => {
  if(form_id) {
    getFormById()
  }
}, [form_id])

  return (
        <AdminLayout>
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
                {
                  formInfo?.questions?.length
                }
                <AddQuestion 
                  selectedType={selectedType} 
                  setSelectedType={setSelectedType}
                  fromInfo={formInfo}
                />
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
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
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
          <FormTitle formTitle={formInfo?.title} setFormTitle={setFormTitle}/>
          
          { formInfo?.questions && formInfo?.questions?.map((question, index) => (
            <DynamicInput model={question?.options} inputType='text' key={index} />
          )) 

          }
          
        </Container>
        </AdminLayout>
    )
}

export default CreateForm