import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker';

export default class MyImagePicker extends Component {
    constructor(props){
        super(props)
        this.state = {
            imagenCargada: ''
        }
    }

    activarImagePicker(){
        ImagePicker.launchImageLibraryAsync()
        .then(imagenData => this.setState({imagenCargada: imagenData.assets[0].uri}))         // al then solo entra si el usuario selecciona una imagen
        .catch()
    }

  render() {
    return (
      <View>
        <Text>Carga una foto para tu perfil</Text>
        {
            this.state.imagenCargada !== '' ? 
            <>
                <Image 
                    source = {{
                        uri: this.state.imagenCargada
                    }}
                    style={styles.img}
                />
                <TouchableOpacity>
                    <Text>
                        Aceptar imagen
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>
                        Rechazar imagen
                    </Text>
                </TouchableOpacity>
            </>
            :
            <>
                <TouchableOpacity onPress={() => this.activarImagePicker()}>
                    <Text>Cargar imagen de la libreria</Text>
                </TouchableOpacity>
            </>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    img: {
        height: 200
    }
})
    
