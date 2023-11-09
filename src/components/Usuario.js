import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class Usuario extends Component {
    constructor(props){
        super(props)
    }
    
  render() {
    return (
      <View>
        <Text>Mi comentario es: {this.props.data.userName}</Text>
      </View>
    )
  }
}