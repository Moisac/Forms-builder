import { Badge, Button, Divider, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Switch, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { HiOutlineViewGridAdd } from 'react-icons/hi'
import { QUESTION_TYPES } from '../constants/QuestionTypes'

interface IProps {
  selectedType: any;
  setSelectedType(value: any): void;
  fromInfo: any;
}


const AddQuestion = ({
  selectedType,
  setSelectedType,
  fromInfo
}: IProps) => {
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
    const updatedForm = {
      questions: [ ...fromInfo?.questions, { ...selectedType }]
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
      await data.json()

    } catch(err) {
        console.error(err)
    } finally {
        // setIsLoaded(true)
    }
  }

  const handleAdd = () => {
    handleAddQuestion()
    setSelectedType({})
    onClose()
  }

  const TypeOptions = () => {
    return (
      <>
       {selectedType?.options && 'required' in selectedType?.options && 
        <Flex>
              <FormLabel htmlFor='isRequired'>isRequired:</FormLabel>
              <Switch 
                id='isRequired' 
                isChecked={selectedType?.options?.required} 
                onChange={() => handleOption('required', !selectedType?.options?.required)}
              />
        </Flex>}

        {selectedType?.options && 'minLength' in selectedType?.options &&
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
        </Flex>}

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
      <Button colorScheme='messenger' onClick={onOpen} leftIcon={<HiOutlineViewGridAdd />} display='block'>
        Add question
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Choose question type</ModalHeader>
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
            Add question
          </Button>
        </ModalFooter>
      </ModalContent>
      </Modal>
    </>
  )
}

export default AddQuestion