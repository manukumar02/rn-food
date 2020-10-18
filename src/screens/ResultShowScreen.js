import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import yelp from '../api/yelp';

const ResultShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam('id');

  const getResult = async (id) => {
    try {
      const { data } = await yelp.get(`/${id}`);
      setResult(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getResult(id);
  }, [])

  if (!result) {
    return null
  }

  return (
    <View>
      <Text>{result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />
        }}
      />
    </View>
  )
}

export default ResultShowScreen

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150
  }
})
