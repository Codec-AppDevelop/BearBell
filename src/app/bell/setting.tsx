import { JSX } from "react"
import { View, Text, Switch, StyleSheet } from "react-native"

const AAA = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View>
        <Text>オート再生</Text>
        <Text>一定時間ごとの自動再生モード ON/OFF</Text>
        <Switch />
      </View>

      <View>
        <Text>時間間隔</Text>
        {/* slider をインストールして追加
        https://docs.expo.dev/versions/latest/sdk/slider/ */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
})

export default AAA
