import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Itens({ name, description, html_url}) {
  return (
    <View style={styles.container}>
      <View style={styles.data}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          Linking.canOpenURL(html_url)
          .then(supported => {
            if (!supported) {
              return false
            } else {
              return Linking.openURL(html_url)
            }
          })
          .catch(err => console.log(err))
        }}
        style={styles.button}
        activeOpacity={0.7}
      >
        <Text style={styles.btnText}>Acessar Repositório</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 15,
  },
  data: {
    padding: 10,
  },
  name: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: '#808080',
  },
  button: {
    backgroundColor: '#353839',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    padding: 10,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  }
})