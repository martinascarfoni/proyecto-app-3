import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
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
                    errorMail: "Verificá que el mail sea valido."
                }
            })
        }
        else if (this.state.password == "" || this.state.password.length < 6) {
            this.setState({
                errores: {
                    ...this.state.errores,
                    errorPassword: "La contraseña no puede estar vacía"
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
            <View>
                <Text>Logueate a mi app!</Text>
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

                <Text>¿No tienes una cuenta aún?</Text>
                <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Register')}>
                        <Text> Registrate aquí! </Text>
                    </TouchableOpacity>

                {this.state.mail== "" || this.state.userName== "" || this.state.password== "" ? "": 
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {this.loguearUsuario(this.state.mail, this.state.password), this.props.navigation.navigate('TabNavigation')}}>
                    <Text>Iniciar sesión</Text>
                </TouchableOpacity>}
                </View>
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
        padding:16,
        marginBottom: 24
    },
    textBtn:{
        color:'white'
    }
})