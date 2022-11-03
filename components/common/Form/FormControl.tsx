import { PropsWithChildren } from 'react'
import {
  FormControl as CFormControl,
  FormControlProps,
  FormLabel,
} from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

import { useResponsiveSize } from 'hooks'
import FormFieldError from './FormFieldError'

type Props = {
  isRequired?: boolean
  name?: string
  label?: string
  error?: FieldError
}

const FormControl = ({
  isRequired,
  name,
  label,
  error,
  children,
  ...restProps
}: PropsWithChildren<Props> & FormControlProps) => {
  const size = useResponsiveSize({ minSm: true })

  return (
    <CFormControl id={name} isRequired={isRequired} {...restProps}>
      {label && (
        <FormLabel whiteSpace="pre" size={size} mb={1}>
          {label}
        </FormLabel>
      )}
      {children}
      {!!error && <FormFieldError error={error} label={label} />}
    </CFormControl>
  )
}

export default FormControl
