import { JSX, useCallback } from "react"
import {
  View, Text, StyleSheet,
  Image, TouchableOpacity
} from "react-native"
import { router, useNavigation, useLocalSearchParams, useFocusEffect } from "expo-router"
import { useAudioPlayer } from "expo-audio"
import { Ionicons } from "@expo/vector-icons"

import assetsPath from "../../components/assetsPath"

interface Props {
  flg?: string
  time?: string
  sens?: string
  no?: string
}

const settingButtonPressed = (settingParams: Props): void => {
  router.push({ pathname: 'bell/setting', params: { flg : String(settingParams.flg), time : String(settingParams.time), sens : String(settingParams.sens), no : String(settingParams.no)} })
}

const Bell = (): JSX.Element => {
  const navigation = useNavigation()
  let settingParams = useLocalSearchParams()

  if (Object.keys(settingParams).length === 0) {
    settingParams = {
      flg : String(0),
      time : String(5),
      sens: String(1),
      no : String(0) }
  }

  const audioSource = assetsPath.audio[Number(settingParams.no)]
  const player = useAudioPlayer(audioSource)

  const playSound = () => {
    player.seekTo(0)
    player.play()
  }

  const mainTxtFnc = (flgNo: number): string => {
    if (flgNo > 0) {
      return ('自動再生 ON')
    } else {
      return ('自動再生 OFF')
    }
  }
  const mainTxt = mainTxtFnc(Number(settingParams.flg))

  const subTxtFnc = (flgNo: number, time: number, sens: number): string => {
    if (flgNo === 1) {
      return (`${time}s 間隔`)
    } else if (flgNo === 2) {
      let retTxt = '振動検知'
      if (sens === 0) {
        retTxt = retTxt + ' 感度：低（大きな振動に反応）'
      } else if (sens === 1) {
        retTxt = retTxt + ' 感度：中'
      } else if (sens === 2) {
        retTxt = retTxt + ' 感度：高（小さい振動にも反応）'
      }
      return (retTxt)
    } else {
      return ('')
    }
  }
  const subTxt = subTxtFnc(Number(settingParams.flg), Number(settingParams.time), Number(settingParams.sens))

  useFocusEffect( useCallback(() => {

    const intervalRef = setInterval(() => {
      if (Number(settingParams.flg) === 1) {
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
            source={assetsPath.image[Number(settingParams.no)]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.settingTextArea}>
        <Text style={styles.settingText_main}>{mainTxt}</Text>
        <Text style={styles.settingText_sub}>{subTxt}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#eeeeee'
  },
  imageArea: {
    height: '60%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  touchableArea: {
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
