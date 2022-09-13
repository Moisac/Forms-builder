import { Badge, Button, Divider, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Switch, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { HiOutlineViewGridAdd } from 'react-icons/hi'
import { QUESTION_TYPES } from '../constants/QuestionTypes'
import { getApiData } from '../utils/services'
import { v4 as uuidv4 } from 'uuid'

interface IProps {
  selectedType: any;
  setSelectedType(value: any): void;
  fromInfo: any;
  actionType: 'add' | 'edit'
  handleEditQuestion?: (question) => void
  setFormInfo: (info) => void
}


const AddQuestion = ({
  selectedType,
  setSelectedType,
  fromInfo,
  actionType,
  handleEditQuestion,
  setFormInfo
}: IProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const router = useRouter()
  const { id: form_id } = router.query

  const selectQuestionType = (questionType: string) => {
    setSelectedType(questionType)
  }

  const handleOption = (option: string, value: unknown) => {
    setSelectedType({ ...selectedType, options: { ...selectedType?.options, [option]: value }})
  }

  const handleClose = () => {
    onClose()
    setSelectedType({})
  }

  const handleAddQuestion = async () => {
    let updatedForm = {}

    if(actionType === 'add') {
      updatedForm = {
        questions: [ ...fromInfo?.questions, { id: uuidv4(), ...selectedType }]
      }
    } else if(actionType === 'edit') {
      const filteredQuestions = fromInfo?.questions.filter(question => question.id !== selectedType?.id)
      updatedForm = {
        questions: [ ...filteredQuestions, { ...selectedType }]
      }
    }
    const data = await getApiData(
      `api/form/${form_id}`,
      'PATCH',
      setIsLoaded,
      updatedForm
    )

    setFormInfo(data)

    if(data?.id) {
      await getApiData(
        `api/form/${form_id}`,
        'GET',
        setIsLoaded
      )
    }
  }

  const handleAdd = () => {
    handleAddQuestion()
    setSelectedType({})
    onClose()
  }

  const handleEdit = () => {
    handleEditQuestion()
    onOpen()
  }

  const TypeOptions = () => {
    return (
      <>
        <FormControl>
            <FormLabel>Name</FormLabel>
            <Input 
              name='name'
              type='text'
              placeholder='Question name'
              value={selectedType?.options?.name}
              onChange={(e) => handleOption('name', e?.target?.value)}
            />
        </FormControl>
       { selectedType?.options && 'required' in selectedType?.options && 
          <Flex>
                <FormLabel htmlFor='isRequired'>isRequired:</FormLabel>
                <Switch 
                  id='isRequired' 
                  isChecked={selectedType?.options?.required} 
                  onChange={() => handleOption('required', !selectedType?.options?.required)}
                />
          </Flex>
        }

        { selectedType?.options && 'minLength' in selectedType?.options &&
          <Flex>
            <FormLabel htmlFor='minLength'>Min length:</FormLabel>
            <NumberInput 
              defaultValue={1} 
              min={1} 
              max={50} 
              value={selectedType?.options?.minLength} 
              onChange={(value: number) => handleOption('minLength', Number(value))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        }

        {selectedType?.options && 'maxLength' in selectedType?.options &&
        <Flex>
          <FormLabel htmlFor='isRequired'>Max length:</FormLabel>
          <NumberInput 
            defaultValue={1} 
            min={1} 
            max={50} 
            value={selectedType?.options?.maxLength} 
            onChange={(value: number) => handleOption('maxLength', Number(value))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>}

        { selectedType?.options && 'label' in selectedType?.options &&
          <FormControl>
              <FormLabel>Label</FormLabel>
              <Input 
                name='label'
                type='text'
                placeholder='Default label...'
                value={selectedType?.options?.label}
                onChange={(e) => handleOption('label', e?.target?.value)}
              />
          </FormControl>
        }

        { selectedType?.options && 'placeholder' in selectedType?.options &&
          <FormControl>
              <FormLabel>Placeholder</FormLabel>
              <Input 
                name='placeholder'
                type='text'
                placeholder='Default placeholder...'
                value={selectedType?.options?.placeholder}
                onChange={(e) => handleOption('placeholder', e?.target?.value)}
              />
          </FormControl>
        }

        { selectedType?.options && 'helperText' in selectedType?.options &&
          <FormControl>
              <FormLabel>Helper text</FormLabel>
              <Input 
                name='helperText'
                type='text'
                placeholder='Default helper text...'
                value={selectedType?.options?.helperText}
                onChange={(e) => handleOption('helperText', e?.target?.value)}
              />
          </FormControl>
        }
      </>
    )
  }

  return (
    <>
    {
      actionType === 'add' ?
      (
        <Button 
          colorScheme='messenger' 
          onClick={onOpen} 
          leftIcon={<HiOutlineViewGridAdd />} 
          display='block'
          width='100%'
          mt='10'
        >
          Add question
        </Button>
      )
      :
      (
        <IconButton
          variant='link'
          colorScheme='messenger'
          aria-label='Edit'
          fontSize='14px'
          icon={<FiEdit2 />}
          onClick={handleEdit}
        />
      )
    }

      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{ actionType === 'add' ? 'Choose question type' : 'Edit question type' }</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction='row'>
          { QUESTION_TYPES?.map(questionType => (
            <Badge 
              colorScheme={questionType?.badgeColor}
              key={questionType?.type}
              p='2'
              borderRadius='5'
              cursor='pointer'
              onClick={() => selectQuestionType(questionType)}
            >
              { questionType?.type }
            </Badge>
          )) }
          </Stack>

          <Divider mt='5' mb='5' />
            { TypeOptions() }
        </ModalBody>

        <ModalFooter>
          <Button variant='outline' colorScheme='red' mr={3} onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            variant='solid' 
            colorScheme='messenger' 
            disabled={!!selectedType && !!!selectedType?.type}
            onClick={handleAdd}
          >
            { actionType === 'add' ? 'Add question' : 'Edit question' }
          </Button>
        </ModalFooter>
      </ModalContent>
      </Modal>
    </>
  )
}

export default AddQuestion