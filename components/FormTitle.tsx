import { EditablePreview, IconButton, Input, useEditableControls, ButtonGroup, Editable, Tooltip, EditableInput, Skeleton } from "@chakra-ui/react";
import { SetStateAction } from "react"
import { BsCheck2 } from "react-icons/bs";
import { IoMdClose } from "react-icons/io"

interface IProps {
  formTitle: string
  setFormTitle: (value: SetStateAction<null>) => void
  handleUpdateTitle: () => void
}

const FormTitle = ({
  formTitle,
  setFormTitle,
  handleUpdateTitle
}: IProps) => {
    function EditableControls() {
      const {
        isEditing,
        setIsEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps
      } = useEditableControls();
  
  
      return isEditing ? (
        <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
          <IconButton icon={<BsCheck2 />} {...getSubmitButtonProps()} onClick={handleUpdateTitle}/>
          <IconButton
            icon={<IoMdClose />}
            {...getCancelButtonProps()}
          />
        </ButtonGroup>
      ) : null;
    }

    return (
        formTitle ?
          <Editable
              defaultValue={formTitle}
              isPreviewFocusable={true}
              selectAllOnFocus={false}
            >
          <Tooltip label="Click to edit">
            <EditablePreview
                py={2}
                px={4}
                background='white'
                width='100%'
            />
          </Tooltip>
          <Input py={2} px={4} as={EditableInput} value={formTitle} onChange={(e) => setFormTitle(e?.target?.value)}/>
          <EditableControls />
        </Editable>
          
        :

        <Skeleton
            height='40px'
            fadeDuration={4}
        />
    );
  }

  export default FormTitle