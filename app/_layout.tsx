import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import bgBlur from '../src/assets/bg-blur.png'
import { ImageBackground } from 'react-native'
import { Provider } from 'react-redux'
import { store } from '../src/redux/store'

export default function Layout() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <Provider store={store}>
      <ImageBackground
        source={bgBlur}
        className="relative flex-1 bg-gray-900"
        imageStyle={{ position: 'absolute', left: '-100%' }}
      >
        <StatusBar style="light" translucent />

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
            animation: 'fade',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="delete" />
        </Stack>
      </ImageBackground>
    </Provider>
  )
}
