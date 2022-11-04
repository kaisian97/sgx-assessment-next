import { IconButton as CIconButton, IconButtonProps } from '@chakra-ui/react'
import { useResponsiveSize } from 'hooks'

type Props = {}

const IconButton = ({ size, ...restProps }: Props & IconButtonProps) => {
  const defaultSize = useResponsiveSize()
  return <CIconButton size={size || defaultSize} {...restProps} />
}

export default IconButton
