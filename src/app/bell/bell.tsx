import { JSX, useEffect } from "react"
import {
  View, Text, StyleSheet,
  Image, Button, TouchableOpacity
} from "react-native"
import { router, useNavigation } from "expo-router"
import { useAudioPlayer } from "expo-audio"

const settingButtonPressed = (): void => {
  router.push({ pathname: 'bell/setting' })
}

const Bell = (): JSX.Element => {
  const audioSource = require('../../../assets/bellSound/sample.mp3')
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={settingButtonPressed} title='x'/>
    })
  }, [])

  const player = useAudioPlayer(audioSource)

  const playSound = () => {
    if (!player.playing) {
      player.seekTo(0)
      player.play()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageArea}>
        <TouchableOpacity style={styles.touchableArea} onPress={playSound}>
          <Image
            style={styles.bellImage}
            source={require('../../../assets/bellImage/bell1.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.settingTextArea}>
        <Text style={styles.settingText_main}>オート再生  ON</Text>
        <Text style={styles.settingText_sub}>再生間隔  1 min</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  imageArea: {
    height: '60%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  touchableArea: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    alignItems: 'center'
  },
  bellImage: {
    width: 256
  },
  settingTextArea: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%'
  },
  settingText_main: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 20,
    lineHeight: 24
  },
  settingText_sub: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 12,
    lineHeight: 16
  }
})

export default Bell
