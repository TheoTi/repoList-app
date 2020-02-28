import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import Constants from 'expo-constants'

import logo from './assets/gitLogo.png'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={logo}
        resizeMode="contain"
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
})
