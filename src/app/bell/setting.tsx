import { JSX, useEffect, useState } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { router, useLocalSearchParams, useNavigation } from "expo-router"
import { Picker } from '@react-native-picker/picker'
import Slider from "@react-native-community/slider"

import assetsPath from "../../components/assetsPath"
import { Feather } from "@expo/vector-icons"

const checkButtonPressed = (flg_autoPlay: number, time: number, sens: number, bellNo: number): void => {
  router.dismissTo({pathname: 'bell/bell', params: { flg : String(flg_autoPlay), time : String(time), sens : String(sens), no : String(bellNo) }})
}

const bellSelectionPressed = (flg_autoPlay: number, time: number, sens: number, bellNo: number) => {
  router.push({ pathname: 'bell/bellSelection', params: { flg : String(flg_autoPlay), time : String(time), sens : String(sens), no : String(bellNo) } })
}

const Setting = (): JSX.Element => {
  const settingParams = useLocalSearchParams()

  const [selectedValue, setselectedValue] = useState(Number(settingParams.flg))
  const [sliderValue_time, setSliderValue_time] = useState(Number(settingParams.time))
  const [sliderValue_sens, setSliderValue_sens] = useState(Number(settingParams.sens))
  // const toggleSwitch = () => setselectedValue(previousState => !previousState)
  const navigation = useNavigation()

  const sliderSensLabel = ['低（大きな振動に反応）', '中', '高（小さい振動にも反応）']

  useEffect(()=>{
    navigation.setOptions({
      headerTitle: 'Setting',
      headerRight: () =>
        <TouchableOpacity
          onPress={() => {
            checkButtonPressed(selectedValue, sliderValue_time, sliderValue_sens, Number(settingParams.no))
          }}
          style={styles.rightButton}
        >
          <Feather name="check" size={24} color="white" />
        </TouchableOpacity>
    })
  },[selectedValue, sliderValue_time, settingParams])

  return (
    <View style={styles.container}>
      <View style={styles.listItem_picker}>
        <View style={styles.listItem_subText}>
          <Text style={styles.itemMainText}>自動再生設定</Text>
          <Text style={styles.itemSubText}>自動再生ON/OFFと種類を設定</Text>
        </View>
        <Picker
          onValueChange={(itemValue, itemIndex) => setselectedValue(itemValue)}
          selectedValue={selectedValue}
          style={styles.pickerStyle}
          itemStyle={styles.pikerItem}
        >
          <Picker.Item label='自動再生 オフ' value={0} style={styles.pikerItem} />
          <Picker.Item label='時間間隔 再生' value={1} style={styles.pikerItem} />
          <Picker.Item label='振動検知 再生' value={2} style={styles.pikerItem} />
        </Picker>
      </View>

      <View style={ selectedValue === 1 ? styles.listItem_slide : [styles.listItem_slide, {display: 'none'}]}>
        <View style={styles.listItem_textValue}>
          <Text style={styles.itemMainText}>時間間隔</Text>
          <Text style={styles.itemValue}>{sliderValue_time} s</Text>
        </View>
        <Slider
          minimumValue = {1}
          maximumValue = {30}
          step = {1}
          minimumTrackTintColor = '#00C0C0'
          maximumTrackTintColor = "#000000"
          thumbTintColor = '#00C0C0'
          value = {sliderValue_time}
          onValueChange = {setSliderValue_time}
        />
      </View>

      <View style={ selectedValue === 2 ? styles.listItem_slide : [styles.listItem_slide, {display: 'none'}]}>
        <View style={styles.listItem_textValue}>
          <Text style={styles.itemMainText}>振動検知感度</Text>
          <Text style={styles.itemValue}>{sliderSensLabel[sliderValue_sens]}</Text>
        </View>
        <Slider
          minimumValue = {0}
          maximumValue = {2}
          step = {1}
          minimumTrackTintColor = '#00C0C0'
          maximumTrackTintColor = "#000000"
          thumbTintColor = '#00C0C0'
          value = {sliderValue_sens}
          onValueChange = {setSliderValue_sens}
        />
      </View>

      <TouchableOpacity
        style={styles.listItem_switch}
        onPress={() => bellSelectionPressed(Number(settingParams.flg), Number(settingParams.time), Number(settingParams.sens), Number(settingParams.no))}
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

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddddd',
    width: '100%',
    alignItems: 'center'
  },
  listItem_picker: {
    backgroundColor: '#eeeeee',
    paddingLeft: 24,
    paddingRight: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'rgba(0, 0, 0, 0.15)',
    width: '100%'
  },
  listItem_switch: {
    backgroundColor: '#eeeeee',
    paddingLeft: 24,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    width: '100%'
  },
  listItem_slide: {
    backgroundColor: '#eeeeee',
    paddingBottom: 16,
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
    alignItems: 'center',
    paddingBottom: 16,
    width: '100%'
  },
  itemMainText: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#00C0C0'
  },
  itemSubText: {
    marginBottom: 16,
    fontSize: 10,
    lineHeight: 16,
    color: 'rgba(0, 0, 0, 0.4)'
  },
  itemValue: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
    marginRight: 16,
    textAlign: 'right',
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
  },
  pickerStyle: {
    width: '50%'
  },
  pikerItem: {
    fontSize: 16,
    lineHeight: 24
  }
})

export default Setting
