import React, { Component } from 'react'
import { Text, View } from 'react-native'
import FormLogin from '../components/FormLogin'

export default class Login extends Component {
  render() {
    return (
      <View>
        <FormLogin navigation={this.props.navigation}/>
      </View>
    )
  }
}
