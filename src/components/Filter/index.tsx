import { TouchableOpacityProps } from 'react-native'
import { Container, Title, FilterStyleProps } from './styles'

type FilterProps = TouchableOpacityProps &
  FilterStyleProps & {
    title: string
  }

export function Filter({ title, isActive = false, ...props }: FilterProps) {
  return (
    <Container isActive={isActive} {...props}>
      <Title>{title}</Title>
    </Container>
  )
}
