import { Button } from '@components/Button'
import { GroupCard } from '@components/GroupCard'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ListEmpty } from '@components/ListEmpty'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getAllGroups } from '@storage/group/group-get-all'
import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { Container } from './styles'
import { Loading } from '@components/Loading'

export function Groups() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [groups, setGroups] = useState<string[]>([])
  const { navigate } = useNavigation()

  async function fetchGroups() {
    try {
      setIsLoading(true)
      const data = await getAllGroups()
      setGroups(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string) {
    navigate('players', { group })
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

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message={'Que tal cadastrar a primeira turma?'} />
          )}
        />
      )}
      <Button title={'Criar nova turma'} onPress={handleNewGroup} />
    </Container>
  )
}
