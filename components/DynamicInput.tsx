import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

interface IProps {
   model: { 
      required: boolean;
      helperText: string;
      placeholder: string;
      label: string;
      name: string;
    }
   inputType: string
   handleUpdateInput?: (name: string, value: unknown) => void
}

const DynamicInput = ({
    model,
    inputType,
    handleUpdateInput
}: IProps) => {

  return (
    <>
        <FormControl isRequired={model?.required}>
            <FormLabel>{ model?.label }</FormLabel>
            <Input 
              type={inputType} 
              placeholder={model?.placeholder} 
              onChange={(e) => handleUpdateInput(model?.name, e?.target?.value)} 
            />
            { model?.helperText &&  <FormHelperText>{ model?.helperText }</FormHelperText>}
        </FormControl>
  </>
  )
}

export default DynamicInput