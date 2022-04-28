import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Button,
  StyleSheet,
} from 'react-native'

import { Text, View, SafeAreaView, useThemeColor } from '../components/Themed'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { getBackendActor } from '../lib/actor'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default function HomeScreen({ navigation }: any) {
  const [counter, setCounter] = useState(0)
  const [loading, setLoading] = useState(true)
  const theme = useColorScheme()
  const color = Colors[theme].text

  const load = async () => {
    try {
      setLoading(true)
      const actor = await getBackendActor()
      setCounter(Number(await actor.get()))
      setLoading(false)
    } catch (e) {
      console.error(e)
    }      
  }

  useEffect(() => {    
    load()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {loading ? <ActivityIndicator color={color} size="large" /> : <View>
        <Text>counter value in canister: {counter}</Text>
      </View>}

      <View>
        <Button title="Run Query" onPress={load} />
        <Button title="Navigate to Screen" onPress={() => navigation.navigate('Video')} />
      </View>
    </SafeAreaView>
  )
}
