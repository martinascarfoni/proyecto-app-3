import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'

export default class CamaraPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            mostrarCamera: true,
            permisos: false,
            urlTemp: ''
        }
        this.metodosDeCamara= null
    }

componentDidMount(){
    Camera.requestCameraPermissionsAsync()
    .then((resp) => this.setState({permisos: true}))  // si entramos en el then, el usuario aceptó los permisos
    .catch((err) => console.log(err))
}



  render() {
    return (
      <View>
        {
          this.state.permisos && this.state.mostrarCamera ?
          <Camera 
              style={styles.camara}
              type={Camera.Constants.Type.back}  // que tippo de camara, frontal o trasera
              ref={(metodosDeCamara)=> this.metodosDeCamara =  metodosDeCamara}
          
          />
          :
          <Text> No tienes permisos para usar la camara</Text>

        }

      </View>
    )
  }
}

const styles= StyleSheet.create({
  camara: {
    height: 300
  }
})