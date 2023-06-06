import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { createGroup } from '@storage/group/group-create'
import { AppError } from '@utils/AppError'
import { useState } from 'react'
import { Alert } from 'react-native'
import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const [group, setGroup] = useState<string>('')

  const { navigate } = useNavigation()

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Ops!', 'Informe o nome da turma.')
      }

      await createGroup(group)
      navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Ops!', error.message)
      } else {
        Alert.alert('Ops!', 'Não foi possível criar a turma.')
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title={'Nova turma'}
          subtitle={'crie a turma para adicionar as pessoas'}
        />

        <Input
          placeholder={'Nome da turma'}
          value={group}
          onChangeText={setGroup}
        />

        <Button
          title={'Criar'}
          style={{
            marginTop: 20,
          }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  )
}
