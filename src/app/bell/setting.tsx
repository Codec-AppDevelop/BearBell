import { JSX, useEffect, useState } from "react"
import { View, Text, Switch, Button, Image, TouchableOpacity, StyleSheet } from "react-native"
import Slider from "@react-native-community/slider"
import { router, useLocalSearchParams, useNavigation } from "expo-router"

import assetsPath from "../../components/assetsPath"
import { Feather } from "@expo/vector-icons"

const checkButtonPressed = (flg_autoPlay: boolean, timeDuration: number, bellNo: number): void => {
  router.back()
  router.setParams({ flg : String(flg_autoPlay), time : String(timeDuration), no : String(bellNo) })
}

const bellSelectionPressed = (flg_autoPlay: boolean, timeDuration: number, bellNo: number) => {
  router.push({ pathname: 'bell/bellSelection', params: { flg : String(flg_autoPlay), time : String(timeDuration), no : String(bellNo) } })
}

const Setting = (): JSX.Element => {
  const settingParams = useLocalSearchParams()
  console.log(settingParams)

  const [isEnabled, setIsEnabled] = useState(settingParams.flg === "true")
  const [value, setValue] = useState(Number(settingParams.time))
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)
  const navigation = useNavigation()

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: 'Setting',
      headerRight: () =>
        <TouchableOpacity
          onPress={() => {
            checkButtonPressed(isEnabled, value, Number(settingParams.no))
          }}
          style={styles.rightButton}
        >
          <Feather name="check" size={20} color="white" />
        </TouchableOpacity>
    })
  },[isEnabled, value, settingParams])

  return (
    <View style={styles.container}>
      <View style={styles.listItem_switch}>
        <View style={styles.listItem_subText}>
          <Text style={styles.itemMainText}>オート再生</Text>
          <Text style={styles.itemSubText}>一定時間ごとの自動再生モード ON/OFF</Text>
        </View>
        <Switch
          thumbColor = {isEnabled ? '#00C0C0' : '#aaaaaa'}
          trackColor = {{true:'#00C0C0'}}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={styles.listItem_slide}>
        <View style={styles.listItem_textValue}>
          <Text style={styles.itemMainText}>時間間隔</Text>
          <Text style={styles.itemValue}>{value} s</Text>
        </View>
        <Slider
          minimumValue = {1}
          maximumValue = {30}
          step = {1}
          minimumTrackTintColor = '#00C0C0'
          maximumTrackTintColor = "#000000"
          thumbTintColor = '#00C0C0'
          value = {value}
          onValueChange = {setValue}
        />
      </View>

      <TouchableOpacity
        style={styles.listItem_switch}
        onPress={() => bellSelectionPressed(settingParams.OnOffFlg === 'true', Number(settingParams.time), Number(settingParams.no))}
        activeOpacity={1}
      >
        <View style={styles.listItem_subText}>
          <Text style={styles.itemMainText}>ベルの音</Text>
          <Text style={styles.itemSubText}>数種類のオプションからベルの音を選択</Text>
        </View>
        <Image
          style={styles.bellImage}
          source={assetsPath.image[Number(settingParams.no)]}
        />
      </TouchableOpacity>

      {/* <View style={styles.saveButtonArea}>
        <Button
            title = 'Save'
            color = '#00C0C0'
            onPress = {() => saveButtonPressed(isEnabled, value, Number(settingParams.no))}
          />
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  listItem_switch: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    width: '100%'
  },
  listItem_slide: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    width: '100%'
  },
  listItem_subText: {
    justifyContent: 'center'
  },
  listItem_textValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16
  },
  itemMainText: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
    color: '#000000'
  },
  itemSubText: {
    marginBottom: 16,
    fontSize: 10,
    lineHeight: 16,
    color: 'rgba(0, 0, 0, 0.4)'
  },
  itemValue: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(0, 0, 0, 0.4)'
  },
  rightButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30
  },
  bellImage: {
    marginVertical: 8,
    width: '20%',
    aspectRatio: 1/1,
    objectFit: 'contain',
    opacity: 0.6
  }
})

export default Setting
