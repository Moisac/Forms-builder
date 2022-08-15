import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

interface IProps {
    required: boolean;
    helperText: string;
    placeholder: string;
    label: string;
}

const TextInput = ({
    required,
    helperText,
    placeholder,
    label
}: IProps) => {
  return (
    <>
        <FormControl isRequired={required}>
            <FormLabel>{ label }</FormLabel>
            <Input type='email' placeholder={placeholder}/>
            { helperText &&  <FormHelperText>{ helperText }</FormHelperText>}
        </FormControl>
  </>
  )
}

export default TextInput