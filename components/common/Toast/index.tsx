import { UseToastOptions } from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/toast'

const { toast } = createStandaloneToast()

const success = (props: UseToastOptions) =>
  toast({
    ...props,
    status: 'success',
  })

const error = (props: UseToastOptions) =>
  toast({
    ...props,
    status: 'error',
  })

const warning = (props: UseToastOptions) =>
  toast({
    ...props,
    status: 'warning',
  })

const info = (props: UseToastOptions) =>
  toast({
    ...props,
    status: 'info',
  })

export default { success, error, warning, info }
