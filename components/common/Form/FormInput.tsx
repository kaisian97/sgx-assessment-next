import { Input, InputProps } from '@chakra-ui/react'
import { RegisterOptions, useController } from 'react-hook-form'

import { useResponsiveSize } from 'hooks'
import FormControl from './FormControl'

type Props = {
  name: string
  label?: string
  isRequired?: boolean
  rules?: RegisterOptions
}

const FormInput = ({
  isRequired,
  rules,
  name,
  label,
  ...restProps
}: Props & InputProps) => {
  const size = useResponsiveSize({ minSm: true })

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    rules: { required: isRequired ? 'is required' : false, ...rules },
    defaultValue: '',
  })

  return (
    <FormControl
      name={name}
      isRequired={isRequired}
      label={label}
      error={error}
    >
      <Input
        size={size}
        isInvalid={!!error}
        isRequired={false}
        {...restProps}
        {...field}
      />
    </FormControl>
  )
}

export default FormInput
