import { JSX } from "react"
import { Stack } from "expo-router"

const Layout = (): JSX.Element => {

  return <Stack screenOptions={{
    headerStyle: {
      backgroundColor: '#00C0C0'
    },
    headerTintColor: '#FFFFFF',
    headerTitle: 'Bear Bell App',
    headerBackTitle: 'Back',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    headerTitleAlign: 'center',
  }}
/>
}

export default Layout
