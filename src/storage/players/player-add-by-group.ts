import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYERS_COLLECTION } from '@storage/storage-config'
import { AppError } from '@utils/AppError'
import { PlayerStorageDTO } from './player-storage-dto'
import { getAllPlayersByGroup } from './players-get-by-group'

export async function addPlayerByGroup(
  newPlayer: PlayerStorageDTO,
  group: string,
) {
  try {
    const storedPlayers = await getAllPlayersByGroup(group)

    const playerAlreadyExists = storedPlayers.some(
      (player) => player.name === newPlayer.name,
    )

    if (playerAlreadyExists) {
      throw new AppError('Já existe um jogador com esse nome.')
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error
  }
}
