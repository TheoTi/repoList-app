import React, { useState, useEffect } from 'react';
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AntDesign } from 'expo-vector-icons'

import Itens from './Itens'

export default function List({ name, list, close }) {
  const [repo, setRepo] = useState([])
  const [offset] = useState(new Animated.ValueXY({ x:0, y: 200 }))
  
  useEffect(() => {
    setRepo(list)

    Animated.spring(offset.y, {
      toValue: 0,
      damping: 85,
    }).start()
  }, [])

  return (
    <Animated.View style={[styles.container, {
      transform: [
        {translateY: offset.y}
      ]
    }]}>
      <View style={styles.topSide}>
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity
          style={styles.btnClose}
          onPress={() => close()}
        >
          <AntDesign
            name="arrowleft"
            color="#fff"
            size={24}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={repo}
        renderItem={ ({item}) => <Itens name={item.name} description={item.description} html_url={item.html_url} /> }
        keyExtractor={(item, index) => index.toString()}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'stretch',
    flexDirection: 'column',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    padding: 10,
    marginTop: -30,
  },
  topSide: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -5,
  },
  name: {
    fontSize: 18,
    color: '#FFF',
    textTransform: 'uppercase',
    textAlign: 'center',
    padding: 10,
  },
  btnClose: {
    position: 'absolute',
    left: 30,
  }
})