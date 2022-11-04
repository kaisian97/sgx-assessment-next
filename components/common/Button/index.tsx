import { Button as CButton, ButtonProps } from '@chakra-ui/react'
import { useResponsiveSize } from 'hooks'

type Props = {}

const Button = ({
  size,
  children,
  disabled,
  isLoading,
  ...restProps
}: Props & ButtonProps) => {
  const defaultSize = useResponsiveSize({ minSm: true })
  return (
    <CButton
      size={size || defaultSize}
      isLoading={isLoading}
      disabled={isLoading || disabled}
      {...restProps}
    >
      {children}
    </CButton>
  )
}

export default Button
