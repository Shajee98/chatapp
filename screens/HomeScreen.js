import React from 'react'
import { Button, View } from 'react-native'

const HomeScreen = ({navigation}) => {

  return (
    <View>
      <Button onPress={() => navigation.navigate('Chat')} title='Go to Chat' />
    </View>
  )
}

export default HomeScreen