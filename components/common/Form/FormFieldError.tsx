import { Box } from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

type Props = {
  error: FieldError
  label?: string
}

const FormFieldError = ({ error, label }: Props) => {
  return (
    !!error && (
      <Box color={'red.500'} fontSize="sm" position="absolute">
        {`${label || 'This field'} ${error.message}`}
      </Box>
    )
  )
}

export default FormFieldError
