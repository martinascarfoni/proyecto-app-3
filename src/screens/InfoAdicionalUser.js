import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import MyImagePicker from '../components/MyImagePicker'
import { db } from '../firebase/config'

export default class InfoAdicionalUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fotoDePerfil: ''
        }
    }

    actualizarEstadoFotoDePerfil(url) {
        this.setState({
            fotoDePerfil: url
        })
    }

    actualizarDocDelUsuario(){
        console.log(this.props.route.params.docId)
        db
        .collection('users')
        .doc(this.props.route.params.docId)
        .update({
            fotoPerfil: this.state.fotoDePerfil
        })
        .then(resp => {
            this.props.navigation.navigate('Home')
            console.log()
        })
    }

    omitirPaso(){
        db
        .collection('users')
        .doc(this.props.route.params.docId)
        .update({
            fotoPerfil: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
        })
        .then(resp => {
            this.props.navigation.navigate('Login')
        })
        .catch(err => console.log(err))
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulos}>Foto de perfil</Text>

                <MyImagePicker actualizarFotoDePerfil={(url) => this.actualizarEstadoFotoDePerfil(url)} />
                {
                    this.state.fotoDePerfil !== '' ?
                        <TouchableOpacity onPress={() => this.actualizarDocDelUsuario()}>
                            <Text style={styles.elmu2}>
                                Añadir foto de perfil
                            </Text>
                        </TouchableOpacity>
                        : 
                        null
                }
                <TouchableOpacity onPress={() => this.omitirPaso()}>
                    <Text style={styles.elmu2}>
                        Omitir este paso
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#39343d'
    },
    elmu2: {
        color: 'rgb(204, 204, 204)',
        padding: 10, 
        fontWeight: 'bold' 
    },
    titulos:{
        padding: 10,
        marginBottom: 10, 
        marginTop: 10,
        color: 'rgb(204, 204, 204)',
        fontWeight:'bold',
        fontSize: 20
      },
})