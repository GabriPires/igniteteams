import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYERS_COLLECTION } from '@storage/storage-config'
import { PlayerStorageDTO } from './player-storage-dto'

export async function getAllPlayersByGroup(group: string) {
  try {
    const storage = await AsyncStorage.getItem(`${PLAYERS_COLLECTION}-${group}`)

    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : []

    if (!players) {
      return []
    }
    return players
  } catch (error) {
    throw error
  }
}
