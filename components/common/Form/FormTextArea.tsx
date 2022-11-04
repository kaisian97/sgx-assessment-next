import { Textarea, TextareaProps } from '@chakra-ui/react'
import { useController } from 'react-hook-form'

import { useResponsiveSize } from 'hooks'
import FormControl from './FormControl'

type Props = {
  name: string
  label?: string
  isRequired?: boolean
}

const FormTextarea = ({
  name,
  label,
  isRequired,
  ...restProps
}: Props & TextareaProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    rules: { required: isRequired ? 'is required' : false },
    defaultValue: '',
  })

  const size = useResponsiveSize({ minSm: true })

  return (
    <FormControl
      name={name}
      label={label}
      error={error}
      isRequired={isRequired}
    >
      <Textarea size={size} isInvalid={!!error} {...restProps} {...field} />
    </FormControl>
  )
}

export default FormTextarea
