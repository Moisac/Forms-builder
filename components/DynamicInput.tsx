import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

interface IProps {
   model: { required: boolean;
   helperText: string;
   placeholder: string;
   label: string;}
   inputType: string
}

const DynamicInput = ({
    model,
    inputType
}: IProps) => {
    // const {required, label, placeholder, helperText} = model?.options

  return (
    <>
        <FormControl isRequired={model?.required}>
            <FormLabel>{ model?.label }</FormLabel>
            <Input type={inputType} placeholder={model?.placeholder}/>
            { model?.helperText &&  <FormHelperText>{ model?.helperText }</FormHelperText>}
        </FormControl>
  </>
  )
}

export default DynamicInput