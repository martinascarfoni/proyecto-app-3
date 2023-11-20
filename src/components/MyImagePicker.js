import { Text, View, TouchableOpacity, Image, StyleSheet, TouchableHighlightBase } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { storage } from '../firebase/config'

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
        .catch(err => console.log(err))
    }

    rechazarImagen(){
        this.setState({
            imagenCargada: ''
        })
    }

    aceptarImagen(){
        fetch(this.state.imagenCargada)
        .then(resp => resp.blob())
        .then(imagen => {
            let ref = storage.ref(`imgPerfil/${Date.now()}.jpeg`)
            ref.put(imagen)
            .then(() => {
                ref.getDownloadURL()
                .then(url => this.props.actualizarFotoDePerfil(url))
            })
        })
        .catch(err => console.log(err))
    }

  render() {
    return (
      <View>
        <Text style={styles.elmu2}>Carga una foto para tu perfil</Text>
        {
            this.state.imagenCargada !== '' ? 
            <>
                <Image 
                    source = {{
                        uri: this.state.imagenCargada
                    }}
                    style={styles.img}
                />
                <TouchableOpacity onPress={() => this.aceptarImagen()}>
                    <Text>
                        Aceptar imagen
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => this.rechazarImagen()}>
                    <Text>
                        Rechazar imagen
                    </Text>
                </TouchableOpacity>
            </>
            :
            <>
                <TouchableOpacity onPress={() => this.activarImagePicker()}>
                    <Text style={styles.elmu2}>Cargar imagen de la libreria</Text>
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
    },
    elmu2: {
        color: 'rgb(204, 204, 204)',
        padding: 10, 
        fontWeight: 'bold' 
    }
})
    
