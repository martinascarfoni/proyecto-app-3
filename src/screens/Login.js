import React, { Component } from 'react'
import { Text, View } from 'react-native'
import FormLogin from '../components/FormLogin'
import { auth } from "../firebase/config"




export default class Login extends Component {

  componentDidMount(){
    auth.onAuthStateChanged((user)=>{
        if (user !== null){
            this.props.navigation.navigate('TabNavigation')
        }
    })
  }

  render() {
    return (
      <View>
        <FormLogin navigation={this.props.navigation}/>
      </View>
    )
  }
}
