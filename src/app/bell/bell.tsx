import { JSX, useEffect } from "react"
import {
  View, Text, StyleSheet,
  Image, Button, TouchableOpacity
} from "react-native"
import { router, useNavigation } from "expo-router"

const settingButtonPressed = (): void => {
  router.push({ pathname: 'bell/setting' })
}

const Bell = (): JSX.Element => {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={settingButtonPressed} title='x'/>
    })
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchableArea}>
        <Image
          style={styles.bellImage}
          source={require('../../../assets/bellImage/bell1.png')}
        />
      </TouchableOpacity>
      <Text>Hello World!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignContent: 'center'
  },
  touchableArea: {
    backgroundColor: "#aaaaaa"
  },
  bellImage: {
    width: 256
  }
})

export default Bell
