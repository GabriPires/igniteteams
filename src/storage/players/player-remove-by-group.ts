import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAllPlayersByGroup } from './players-get-by-group'
import { PLAYERS_COLLECTION } from '@storage/storage-config'

export async function removePlayerByGroup(playerName: string, group: string) {
  try {
    const storage = await getAllPlayersByGroup(group)

    const filteredPlayers = storage.filter(
      (player) => player.name !== playerName,
    )

    const players = JSON.stringify(filteredPlayers)

    await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, players)
  } catch (error) {
    throw error
  }
}
