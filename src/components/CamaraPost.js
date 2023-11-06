import { Text, View } from 'react-native'
import React, { Component } from 'react'
import {Camera} from 'expo-camera'

export default class CamaraPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            mostrarCamera: true,
            permisos: false,
            urlTemp: ''
        }
    }

componentDidMount(){
    Camera.requestCameraPermissionsAsync()
    .then((resp) => this.setState({permisos: true}))
    .catch((err) => console.log(err))
}



  render() {
    return (
      <View>
        {

        }
      </View>
    )
  }
}