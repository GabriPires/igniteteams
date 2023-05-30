import theme from '@theme/index'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { ThemeProvider } from 'styled-components/native'
import { Loading } from '@components/Loading'
import { StatusBar } from 'react-native'
import { NewGroup } from '@screens/NewGroup'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle={'light-content'} translucent />
      {fontsLoaded ? <NewGroup /> : <Loading />}
    </ThemeProvider>
  )
}
