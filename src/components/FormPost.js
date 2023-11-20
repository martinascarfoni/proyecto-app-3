import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { auth, db } from "../firebase/config"

export default class FormPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            descripcionPost: "",
           
        }
    }
  render() {
    return (
        <View>
        <TextInput
            style = {styles.input}
            placeholder = 'Agregue una descripción'
            keyboardType = 'default'
            value = {this.props.estadoDescripcion}
            onChangeText = { (text) => this.props.actualizarDescripcion(text) }
            multiline={true}
            numberOfLines={8}
        />

    </View>
      
    )
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: 'green',
        marginBottom: 24,
        color: 'white'
    },
    btn:{
        backgroundColor:'purple',
        padding:16
    },
    textBtn:{
        color:'white'
    }
})