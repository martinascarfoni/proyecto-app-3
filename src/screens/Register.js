import React, { Component } from 'react'
import { Text, View , ActivityIndicator, ImageBackground, StyleSheet} from 'react-native'
import { auth } from "../firebase/config"
import FormRegister from "../components/FormRegister"

export default class Register extends Component {
    constructor(props){
        super(props)
        this.state= {
          hayUsuario: false
        }
    }


    componentDidMount(){
        auth.onAuthStateChanged((user)=>{
            if (user !== null){
                this.props.navigation.navigate('TabNavigation')
            }
        })
        this.setState({
          hayUsuario: true
        })
    }

  render() {
    return (
      <ImageBackground source={require('../../assets/blog2.png')} style={styles.backgroundImage}>
      <View>
          <FormRegister navigation={this.props.navigation}/>
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

