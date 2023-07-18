import { Button } from '@components/Button'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { ListEmpty } from '@components/ListEmpty'
import { PlayerCard } from '@components/PlayerCard'
import { useRoute } from '@react-navigation/native'
import { addPlayerByGroup } from '@storage/players/player-add-by-group'
import { AppError } from '@utils/AppError'
import { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import { Container, Form, HeaderList, PlayersCount } from './styles'
import { getPlayersByGroupAndTeam } from '@storage/players/player-get-by-group-and-team'
import { PlayerStorageDTO } from '@storage/players/player-storage-dto'

type RouteParams = {
  group: string
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState<string>('')
  const [team, setTeam] = useState<string>('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const { params } = useRoute()
  const { group } = params as RouteParams

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        'Ops!',
        'Você precisa digitar o nome da pessoa para adicionar.',
      )
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await addPlayerByGroup(newPlayer, group).then(() => setNewPlayerName(''))
      await fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Ops!', error.message)
      } else {
        Alert.alert('Ops!', 'Não foi possível adicionar a pessoa.')
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await getPlayersByGroupAndTeam(group, team)

      setPlayers(playersByTeam)
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Ops!', error.message)
      } else {
        Alert.alert('Ops!', 'Não foi possível carregar as pessoas.')
      }
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle={'adicione a galera e separe os times'}
      />

      <Form>
        <Input
          placeholder={'Nome da pessoa'}
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon icon={'add'} onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          ListEmptyComponent={<ListEmpty message={'Crie o primeiro time'} />}
        />

        <PlayersCount>{players.length}</PlayersCount>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => {}} />
        )}
        ListEmptyComponent={<ListEmpty message="Não há pessoas nesse time" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title={'Remover turma'} type={'secondary'} />
    </Container>
  )
}
