import { JSX, useEffect, useState } from "react"
import { View, Text, Switch, Button, StyleSheet } from "react-native"
import Slider from "@react-native-community/slider"
import { router, useLocalSearchParams } from "expo-router"

interface Props {
  flg: boolean
  time: number
}

const saveButtonPressed = (flg_autoPlay: boolean, timeDuration: number): void => {
  // router.replace({ pathname: '/bell/bell', params: { flg : flg_autoPlay, time : timeDuration } })
  router.back()
  router.setParams({ flg : String(flg_autoPlay), time : String(timeDuration) })
}

const Setting = (): JSX.Element => {
  const settingParams = useLocalSearchParams()
  // console.log(settingParams)

  const [isEnabled, setIsEnabled] = useState(settingParams.flg === "true")
  const [value, setValue] = useState(Number(settingParams.time))
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

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
          maximumValue = {100}
          step = {1}
          minimumTrackTintColor = '#00C0C0'
          maximumTrackTintColor = "#000000"
          thumbTintColor = '#00C0C0'
          value = {value}
          onValueChange = {setValue}
        />
      </View>

      <View style={styles.saveButtonArea}>
        <Button
            title = 'Save'
            color = '#00C0C0'
            onPress = {() => saveButtonPressed(isEnabled, value)}
          />
      </View>
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
    paddingVertical: 16,
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
    justifyContent: 'space-between'
  },
  listItem_textValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16
  },
  itemMainText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000000'
  },
  itemSubText: {
    fontSize: 10,
    lineHeight: 16,
    color: 'rgba(0, 0, 0, 0.4)'
  },
  itemValue: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(0, 0, 0, 0.4)'
  },
  saveButtonArea: {
    marginVertical: 16,
    paddingVertical: 32,
    width: '80%',
    justifyContent: 'center'
  }
})

export default Setting
