import { Header } from '@components/Header'
import { Container } from './styles'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { getAllGroups } from '@storage/group/group-get-all'

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])
  const { navigate } = useNavigation()

  async function fetchGroups() {
    try {
      const data = await getAllGroups()
      setGroups(data)
    } catch (error) {
      console.log(error)
    }
  }

  function handleNewGroup() {
    navigate('new')
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, []),
  )

  return (
    <Container>
      <Header />
      <Highlight title={'Turmas'} subtitle={'jogue com a sua turma'} />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message={'Que tal cadastrar a primeira turma?'} />
        )}
      />

      <Button title={'Criar nova turma'} onPress={handleNewGroup} />
    </Container>
  )
}
