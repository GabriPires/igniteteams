import { Header } from '@components/Header'
import { Container, Form, HeaderList, PlayersCount } from './styles'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { FlatList } from 'react-native'
import { useState } from 'react'
import { PlayerCard } from '@components/PlayerCard'

export function Players() {
  const [team, setTeam] = useState<string>('Time A')
  const [players, setPlayers] = useState<string[]>(['Gabriel', 'Marcos'])

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={'Nome da turma'}
        subtitle={'adicione a galera e separe os times'}
      />

      <Form>
        <Input placeholder={'Nome da pessoa'} autoCorrect={false} />
        <ButtonIcon icon={'add'} />
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
        />

        <PlayersCount>{players.length}</PlayersCount>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
      />
    </Container>
  )
}
