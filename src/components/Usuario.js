import { Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../firebase/config'
import firebase from 'firebase';

export default class Usuario extends Component {
    constructor(props){
        super(props)
    }

    irAlPerfil(){
      this.props.data.owner=== auth.currentUser.email? this.props.navigation.navigate("ProfilePropio") : this.props.navigation.navigate("ProfileUsuarios", {usuario: this.props.data.owner})
    }
  
    
  render() {
    return (
      <View>
        <Text>
        <Text style = {styles.texto}> {this.props.data.userName}</Text>
          <Image
           source={{uri: this.props.data.fotoPerfil}}
           style = {styles.img}
           resizeMode='contain'
          /> 
        
        </Text>
        <TouchableOpacity onPress={()=> this.irAlPerfil()}>
        <Text  style = {styles.texto}> {this.props.data.owner}</Text>
        </TouchableOpacity>
        
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 80,
    marginBottom: 20
  },
  texto: {
    color: "white"
  }
})