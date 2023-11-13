import { Text, View } from 'react-native'
import React, { Component } from 'react'
import MyImagePicker from '../components/MyImagePicker'

export default class InfoAdicionalUser extends Component {
  render() {
    return (
      <View>
        <Text>Aqui vamos a cargar la informacion adicional</Text>
        <MyImagePicker />
      </View>
    )
  }
}