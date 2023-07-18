import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYERS_COLLECTION, GROUP_COLLECTION } from '@storage/storage-config'
import { getAllGroups } from './group-get-all'

export async function removeGroupByName(groupName: string) {
  try {
    const storedGroups = await getAllGroups()

    const filteredGroups = storedGroups.filter((group) => group !== groupName)

    const groups = JSON.stringify(filteredGroups)

    await AsyncStorage.setItem(`${GROUP_COLLECTION}`, groups)
    await AsyncStorage.removeItem(`${PLAYERS_COLLECTION}-${groupName}`)
  } catch (error) {
    throw error
  }
}
