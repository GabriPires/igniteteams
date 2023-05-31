import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import styled from 'styled-components/native'

export type ButtonIconTypeStyleProps = 'primary' | 'secondary'

type ButtonIconProps = {
  type: ButtonIconTypeStyleProps
}

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;

  justify-content: center;
  align-self: center;

  margin-left: 12px;
`

export const Icon = styled(MaterialIcons).attrs<ButtonIconProps>(
  ({ theme, type }) => ({
    size: 24,
    color: type === 'primary' ? theme.COLORS.GREEN_700 : theme.COLORS.RED,
  }),
)``
