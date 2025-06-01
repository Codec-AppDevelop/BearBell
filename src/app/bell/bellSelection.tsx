import { JSX, useEffect, useState } from "react"
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { router, useLocalSearchParams, useNavigation } from "expo-router"
import { Feather } from "@expo/vector-icons"

import BellSelectionItem from "../../components/bellSelectionItem"

const checkButtonPressed = (flg_autoPlay: number, time: number, sens: number, bellNo: number): void => {
  router.dismissTo({pathname: 'bell/setting', params: { flg : String(flg_autoPlay), time : String(time), sens : String(sens), no : String(bellNo) }})
}

const BellSelect = (): JSX.Element => {
  const settingParams = useLocalSearchParams()

  const navigation = useNavigation()
  const [selectNo, setSelectNo] = useState(Number(settingParams.no))
  const [isPlaying, setIsPlaying] = useState(false)

  const optionNoList = [...Array(4)].map((_, i) => i)

  const selection = (No: number): void => {
    setSelectNo(No)
  }

  const getPlayingStatus = (): boolean => {
    return (isPlaying)
  }

  const setPlayingStatus = (flg: boolean) => {
    setIsPlaying(flg)
  }

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: 'Bell Selection',
      headerRight: () =>
        <TouchableOpacity
          onPress={() => {
            checkButtonPressed(Number(settingParams.flg), Number(settingParams.time), Number(settingParams.sens), selectNo)
          }}
          style={styles.rightButton}
        >
          <Feather name="check" size={24} color="white" />
        </TouchableOpacity>
    })
  },[selectNo])

  return (
    <View style={styles.container}>
      <View style={styles.flexWrap}>

        {optionNoList.map((_, i) => (
          <BellSelectionItem
            No={i}
            OnOffFlg={selectNo === i}
            onPressFunc={selection}
            getPlayingStatusFunc={getPlayingStatus}
            setPlayingStatusFunc={setPlayingStatus}
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
    height: '100%',
    backgroundColor: '#dddddd',
    position: 'relative'
  },
  flexWrap : {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%'
  },
  rightButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30
  }
})

export default BellSelect
