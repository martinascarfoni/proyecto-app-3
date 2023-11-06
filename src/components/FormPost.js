import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { auth, db } from "../firebase/config"

export default class FormPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comentario: "",
            //imágen: "",
        }
    }
  render() {
    console.log(this.props);
    return (
      <View>
            <TextInput
                placeholder='Agrega tu comentario'
                keyboardType='default'
                onChangeText={(text)=> this.setState({comentario:text})}
                value={this.state.comentario}
                multiline={true}
                style={StyleSheet.input}
            />
            <TouchableOpacity onPress={(obj)=> this.props.onSubmit({
                    description: this.state.comentario
                })}
                style={styles.btn} >
                <Text style={styles.textbtn}>Agregar posteo</Text>
                
            </TouchableOpacity>
        </View>
       
     
    )
  }
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: 'green',
        marginBottom: 24
    },
    btn:{
        backgroundColor:'purple',
        padding:16
    },
    textBtn:{
        color:'white'
    }
})