import { SIZE } from './../constant/index'
import useWindowSize from 'react-use/lib/useWindowSize'

type Size = 'xs' | 'sm' | 'md' | 'lg'
type Props = {
  size?: Size
  minMd?: boolean
  minSm?: boolean
}

const useResponsiveSize = ({ size, minMd, minSm }: Props = {}): Size => {
  const { width } = useWindowSize()

  if (size) return size
  if (width > SIZE.LG) return minMd ? 'md' : 'lg'
  if (width < SIZE.LG && (width > SIZE.MD || width > SIZE.SM)) return 'md'
  if (width < SIZE.XS && !minSm) return 'xs'
  return 'sm'
}

export default useResponsiveSize
