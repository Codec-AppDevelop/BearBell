import { JSX, useCallback } from "react"
import {
  View, Text, StyleSheet,
  Image, TouchableOpacity
} from "react-native"
import { router, useNavigation, useLocalSearchParams, useFocusEffect } from "expo-router"
import { useAudioPlayer } from "expo-audio"
import { Ionicons } from "@expo/vector-icons"

interface Props {
  flg?: string
  time?: string
}

const settingButtonPressed = (settingParams: Props): void => {
  router.push({ pathname: 'bell/setting', params: { flg : String(settingParams.flg), time : String(settingParams.time) } })
}

const Bell = (): JSX.Element => {
  const audioSource = require('../../../assets/bellSound/sample.mp3')
  const navigation = useNavigation()
  let settingParams = useLocalSearchParams()

  const player = useAudioPlayer(audioSource)

  const playSound = () => {
    player.seekTo(0)
    player.play()
  }


  useFocusEffect( useCallback(() => {

    const intervalRef = setInterval(() => {
      if (settingParams.flg === "true") {
        playSound()
      }
    }, Number(settingParams.time)*1000)

    navigation.setOptions({
      headerRight: () =>
        <TouchableOpacity
          onPress={() => {
            settingButtonPressed(settingParams)
          }}
          style={styles.rightButton}
        >
          <Ionicons name="settings-sharp" size={20} color="white" />
        </TouchableOpacity>
    })

    return ( () => clearInterval(intervalRef) )
  }, [settingParams]))


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
        <Text style={styles.settingText_main}>オート再生  {settingParams.flg === "true" ? "ON" : "OFF"}</Text>
        <Text style={styles.settingText_sub}>再生間隔  {Number(settingParams.time)} sec</Text>
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
  },
  rightButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30
  }
})

export default Bell
