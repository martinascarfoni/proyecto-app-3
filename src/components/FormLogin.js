import { Text, View, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from "../firebase/config"
import Register from "../screens/Register"

export default class FormLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mail: "",
            password: "",
            errores: {
                errorPassword: "",
                errorMail: ""
            },
            errorMailOContrasenaInconrrecta: ""

        }
    }

    loguearUsuario(mail, password){
        // validaciones de mail, contrasena, contrasena
        if (this.state.mail == "" || this.state.mail.includes("@") == false) {
            this.setState({
                errores: {
                    ...this.state.errores,
                    errorMail: "Verificá que el mail sea válido"
                }
            })
        }
        else if (this.state.password == "" || this.state.password.length < 6) {
            this.setState({
                errores: {
                    ...this.state.errores,
                    errorPassword: "Verificá que la contraseña sea válida"
                }
            })
        } else {
            auth.signInWithEmailAndPassword(mail, password)
            .then((user) => this.props.navigation.navigate("TabNavigation"))
            .catch((e) => {console.log(e), this.setState({
                errorMailOContrasenaInconrrecta: e.message
            })})
        }
    }

    render() {
        return (
            <ImageBackground source={require('../../assets/vlog.jpg')} style={styles.backgroundImage}>
            <View style={styles.Loginformu}>
                <Text style={styles.titulos}>Logueate a mi app!</Text>
                <View>
                <TextInput
                    style = {styles.input}
                    placeholder = 'Escribe tu mail'
                    keyboardType = 'email-address'
                    value = {this.state.mail}
                    onChangeText = { (text) => this.setState({mail: text}) }
                />
                {this.state.errores.errorMail !== "" ? <Text>{this.state.errores.errorMail} </Text> : ""}

                <TextInput
                    style = {styles.input}
                    placeholder = 'Escribe tu password'
                    keyboardType = 'default'
                    value = {this.state.password}
                    secureTextEntry={true}
                    onChangeText = { (text) => this.setState({password: text}) }
                />
                {this.state.errores.errorPassword !== "" ? <Text>{this.state.errores.errorPassword}</Text> : ""}

                {this.state.errorMailOContrasenaInconrrecta !== '' ? <Text>El mail o la contraseña son incorrectos</Text> : ""}

                <Text style={styles.titulos} >¿No tienes una cuenta aún?</Text>
                <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.regi}> Registrate aquí! </Text>
                    </TouchableOpacity>

                {this.state.mail== "" || this.state.userName== "" || this.state.password== "" ? "": 
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {this.loguearUsuario(this.state.mail, this.state.password)}}>
                    <Text style={styles.textBtn}>Iniciar sesión</Text>
                </TouchableOpacity>}
                </View>
            </View>
            </ImageBackground>

        )
    }
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: '#666666',
        marginBottom: 24, 
        color: '#434343',
        borderRadius: 3,
        padding: 10,

    },
    btn:{
        backgroundColor:'purple',
        padding:16,
        marginBottom: 24,
        borderRadius: 5,
    },
    textBtn:{
        color:'white'
    },
    Loginformu: {
        width: 350,
        margin: 20, 
        padding: 35,
        backgroundColor: 'rgba(255, 182, 185, 0.9)',
        borderRadius: 15,
        },
    titulos: {
        padding: 5,
        marginBottom: 10, 
        color: '#434343',
        fontWeight:'bold'

    },
    regi: {
        padding: 5,
        marginBottom: 10, 
        color: 'purple',
        fontWeight:'bold'

    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', 
        justifyContent: 'center',
    }

})