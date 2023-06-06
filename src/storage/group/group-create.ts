import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storage-config'
import { AppError } from '@utils/AppError'
import { getAllGroups } from './group-get-all'

export async function createGroup(groupName: string) {
  try {
    const storedGroups = await getAllGroups()

    const groupAlreadyExists = storedGroups.includes(groupName)

    if (groupAlreadyExists) {
      throw new AppError('Já existe um grupo com esse nome.')
    }

    const newStoredGroups = JSON.stringify([...storedGroups, groupName])

    await AsyncStorage.setItem(GROUP_COLLECTION, newStoredGroups)
  } catch (error) {
    throw error
  }
}
