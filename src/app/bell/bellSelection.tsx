import { JSX, useEffect, useState } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { router, useLocalSearchParams, useNavigation } from "expo-router"
import { Feather } from "@expo/vector-icons"

import BellSelectionItem from "../../components/bellSelectionItem"

const checkButtonPressed = (flg_autoPlay: boolean, timeDuration: number, bellNo: number) => {
  router.back()
  router.setParams({ flg : String(flg_autoPlay), time : String(timeDuration), no : String(bellNo) })
}

const BellSelect = (): JSX.Element => {
  const settingParams = useLocalSearchParams()

  const navigation = useNavigation()
  const [selectNo, setSelectNo] = useState(Number(settingParams.no))

  const optionNoList = [...Array(2)].map((_, i) => i)

  const selection = (No: number): void => {
    setSelectNo(No)
  }

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: 'Bell Selection',
      headerRight: () =>
        <TouchableOpacity
          onPress={() => {
            console.log(selectNo)
            checkButtonPressed(settingParams.OnOffFlg === 'true', Number(settingParams.time), selectNo)
          }}
          style={styles.rightButton}
        >
          <Feather name="check" size={20} color="white" />
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
    alignItems: 'center'
  },
  flexWrap : {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  rightButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30
  }
})

export default BellSelect
