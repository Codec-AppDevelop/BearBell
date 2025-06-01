import { JSX, useState } from "react"
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native"
import Entypo from '@expo/vector-icons/Entypo'
import { Feather } from "@expo/vector-icons"
import { AudioSource, useAudioPlayer } from "expo-audio"
import assetsPath from "./assetsPath"

interface Props {
  No: number,
  OnOffFlg: boolean,
  onPressFunc: Function,
  getPlayingStatusFunc: Function,
  setPlayingStatusFunc: Function
}

const BellSelectionItem = (props: Props): JSX.Element => {
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const windowMinLen = Math.min(windowWidth, windowHeight)
  const [isPlaying, setIsPlaying] = useState(false)
  const { No, OnOffFlg, onPressFunc, getPlayingStatusFunc, setPlayingStatusFunc } = props

  const audioSource: AudioSource = assetsPath.audio[No]
  const player = useAudioPlayer(audioSource)

  const playSound = async () => {
    const flg = getPlayingStatusFunc()
    if (!flg) {
      setIsPlaying(true)
      setPlayingStatusFunc(true)
      player.seekTo(0)
      player.play()
      await wait(player.duration)
      setIsPlaying(false)
      setPlayingStatusFunc(false)
    }
  }

  const wait = async (second: number) => {
    return new Promise(resolve => setTimeout(resolve, 1000 * second))
  }

  return (
    <View style={styles.container}>
      <View
        style={ OnOffFlg ? [styles.bellContainer, {borderWidth: 3, borderColor: "#00C0C0"}] : styles.bellContainer }>
        <TouchableOpacity
          style={ isPlaying ? [styles.bellTouchArea, {backgroundColor: "white"}] : styles.bellTouchArea}
          onPress={() => onPressFunc(No)}
          activeOpacity={1}
        >
          <Image
            style={ isPlaying ? [styles.bellImage, {opacity: 1.0}] : styles.bellImage }
            source={assetsPath.image[No]}
          />
          <TouchableOpacity style={styles.playButtonTouchArea} onPress={playSound}>
            <Entypo name="controller-play"
              size={windowMinLen/2/2}
              color={ isPlaying ? 'rgba(0,0,0,0.0)' : 'rgba(0,0,0,0.4)' }
            />
          </TouchableOpacity>
          <View style={styles.checkboxArea}>
            <Feather
              name={ OnOffFlg ? "check-circle" : "circle" }
              size={24}
              color={ OnOffFlg ? "#00C0C0" : "rgba(0,0,0,0.4)" } />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: '100%',
    // height: '100%',
    backgroundColor: '#dddddd'
  },
  bellContainer: {
    width: Math.min(Dimensions.get('window').width,Dimensions.get('window').height)/2,
    height: Math.min(Dimensions.get('window').width,Dimensions.get('window').height)/2,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#dddddd'
  },
  bellTouchArea: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  playButtonTouchArea: {
    width: '50%',
    height: '50%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bellImage: {
      width: '80%',
      objectFit: 'contain',
      opacity: 0.5
  },
  checkboxArea: {
    position: 'absolute',
    left: 8,
    top: 8
  }
})

export default BellSelectionItem
