import { JSX, useEffect, useState } from "react"
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native"
import { useNavigation } from "expo-router"
import { useAudioPlayer } from "expo-audio"
import { Feather, Entypo } from "@expo/vector-icons"
// import Entypo from '@expo/vector-icons/Entypo'
import BellSelectionItem from "../../components/bellSelectionItem"

const BellSelect = (): JSX.Element => {
  const navigation = useNavigation()
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const windowMinLen = Math.min(windowWidth, windowHeight)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectNo, setSelectNo] = useState(0)

  const optionNoList = [...Array(2)].map((_, i) => i)

  const audioSource = require('../../../assets/bellSound/sample.mp3')
  const player = useAudioPlayer(audioSource)

  const playSound = async () => {
    setIsPlaying(true)
    player.seekTo(0)
    player.play()
    await wait(player.duration)
    setIsPlaying(false)
  }

  const wait = async (second: number) => {
    return new Promise(resolve => setTimeout(resolve, 1000 * second))
  }

  const selection = (No: number): void => {
    setSelectNo(No)
  }

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: 'Bell Selection'
    })
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.flexWrap}>

        {optionNoList.map((_, i) => (
          <BellSelectionItem
            No={i}
            OnOffFlg={selectNo === i}
            onPressFunc={selection}
            key={i}
          ></BellSelectionItem>
        ))}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#eeeeee',
  },
  flexWrap : {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  bellContainer: {
    width: Math.min(Dimensions.get('window').width,Dimensions.get('window').height)/2,
    height: Math.min(Dimensions.get('window').width,Dimensions.get('window').height)/2,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)'
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
      width: '90%',
      objectFit: 'contain',
      filter: 'grayscale(70%)'
  },
  checkboxArea: {
    position: 'absolute',
    left: 8,
    top: 8
  }
})

export default BellSelect
