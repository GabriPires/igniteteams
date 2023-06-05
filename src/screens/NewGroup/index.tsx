import { Container, Content, Icon } from './styles'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'

export function NewGroup() {
  const { navigate } = useNavigation()

  function handleNew() {
    navigate('players')
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

        <Input placeholder={'Nome da turma'} />
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
