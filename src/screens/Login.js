import React, { Component } from 'react'
import { Text, View, ImageBackground, StyleSheet, Image} from 'react-native'
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
      <ImageBackground source={require('../../assets/blog2.png')} style={styles.backgroundImage}>
      <View > 
        <FormLogin  navigation={this.props.navigation}/>
      </View>
      </ImageBackground>
      
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },

})
