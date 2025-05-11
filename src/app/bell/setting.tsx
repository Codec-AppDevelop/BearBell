import { JSX } from "react"
import { View, Text, Switch, StyleSheet } from "react-native"
import Slider from "@react-native-community/slider"

const AAA = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.listItem_switch}>
        <View style={styles.listItem_subText}>
          <Text style={styles.itemMainText}>オート再生</Text>
          <Text style={styles.itemSubText}>一定時間ごとの自動再生モード ON/OFF</Text>
        </View>
        <Switch
          thumbColor = '#00C0C0'
          trackColor = {{true:'#00C0C0'}}
          value = {false}
        />
      </View>

      <View style={styles.listItem_slide}>
        <View style={styles.listItem_textValue}>
          <Text style={styles.itemMainText}>時間間隔</Text>
          <Text style={styles.itemValue}>X s</Text>
        </View>
        <Slider
          minimumValue = {0}
          maximumValue = {1}
          minimumTrackTintColor = '#00C0C0'
          maximumTrackTintColor = "#000000"
          thumbTintColor = '#00C0C0'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  listItem_switch: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)'
  },
  listItem_slide: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)'
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
  }
})

export default AAA
