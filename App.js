import React, { useState } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import Constants from 'expo-constants'

// components
import List from './components/List'

import logo from './assets/gitLogo.png'

export default function App() {
  const [fieldIsVisible, setFieldIsVisible] = useState(true)
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState('')
  const [repos, setRepos] = useState([])

  const handleSearch = async () => {
    Keyboard.dismiss()
    setStatus('Procurando...')
    const response = await fetch(`https://api.github.com/users/${username}/repos`).then(async res => {
      const rep = await res.json()
      setRepos(rep)
      setFieldIsVisible(false)
      setStatus(true)
    })
  }

  const handleCloseComponent = () => {
    setFieldIsVisible(true)
    setRepos([])
    setUsername('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={logo}
        resizeMode="contain"
        style={{...styles.logo, marginTop: fieldIsVisible === false ? 20 : 0}}
      />
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={
          Platform.select({
            ios: () => 0,
            android: () => 150,
          })()
        }  
      >

        {fieldIsVisible && <TextInput
          placeholder="Github username"
          placeholderTextColor="#808080"
          autoCorrect={false}
          style={styles.input}
          onChangeText={name => setUsername(name)}
          />}

        {fieldIsVisible && <TouchableOpacity
          style={styles.btnSearch}
          onPress={() => handleSearch()}
        >
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>}
        <Text style={styles.status}>{status}</Text>
      </KeyboardAvoidingView>
      {fieldIsVisible === false && <List name={username} list={repos} close={() => handleCloseComponent()}/>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
  logo: {
    width: 130,
    height: 130,
  },
  input: {
    width: 200,
    height: 40,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 5,
    textAlign: 'center',
  },
  btnSearch: {
    width: 200,
    height: 40,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
  },
  btnText: {
    fontSize: 18,
    fontFamily: 'sans-serif',
    color: '#fff',
    textTransform: 'uppercase'
  },
  status: {
    textAlign: 'center',
    marginTop: 5,
  }
})
