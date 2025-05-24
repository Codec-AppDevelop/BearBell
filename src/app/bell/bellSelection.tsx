import { JSX } from "react"
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native"
import Entypo from '@expo/vector-icons/Entypo'

const BellSelect = (): JSX.Element => {
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const windowMinLen = Math.min(windowWidth, windowHeight)

  return (
    <View style={styles.container}>
      <View style={styles.bellContainer}>
        <TouchableOpacity style={styles.bellTouchArea}>
          <Image
            style={styles.bellImage}
            source={require('../../../assets/bellImage/bell1.png')}
          />
          <TouchableOpacity style={styles.playButtonTouchArea}>
            <Entypo name="controller-play" size={windowMinLen/2/2} color="rgba(0,0,0,0.4)" />
          </TouchableOpacity>
          <View style={styles.checkboxArea}>
            <Entypo name="circle" size={24} color="rgba(0,0,0,0.4)" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  bellContainer: {
    width: '50%',
    aspectRatio: 1/1,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)'
  },
  bellTouchArea: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
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
      objectFit: 'contain'
  },
  checkboxArea: {
    position: 'absolute',
    left: 8,
    top: 8
  }
})

export default BellSelect
