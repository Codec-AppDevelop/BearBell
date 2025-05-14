import { JSX, useEffect, useState } from "react"
import {
  View, Text, StyleSheet,
  Image, Button, TouchableOpacity
} from "react-native"
import { router, useNavigation, useLocalSearchParams } from "expo-router"
import { useAudioPlayer } from "expo-audio"

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

  if (Object.keys(settingParams).length === 0) {
    settingParams = { flg: "false", time: "1" }
  }

  let flgStr = settingParams.flg === "true" ? "ON" : "OFF"

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => {
        settingButtonPressed(settingParams)
      }} title='...'/>
    })

    if (settingParams.flg === "true") {
      const interval = setInterval(() => {
          playSound()
      }, Number(settingParams.time)*1000)
      return () => clearInterval(interval)
    } else {
        stopSound()
    }
  }, [settingParams])

  const player = useAudioPlayer(audioSource)

  const playSound = () => {
    player.seekTo(0)
    player.play()
  }

  const stopSound = () => {
    player.pause()
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
        <Text style={styles.settingText_main}>オート再生  {flgStr}</Text>
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
  }
})

export default Bell
