import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacityProps } from 'react-native'
import { ButtonIconTypeStyleProps, Container, Icon } from './styles'

type ButtonIconProps = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap
  type?: ButtonIconTypeStyleProps
}

export function ButtonIcon({
  icon,
  type = 'primary',
  ...props
}: ButtonIconProps) {
  return (
    <Container {...props}>
      <Icon name={icon} type={type} />
    </Container>
  )
}
