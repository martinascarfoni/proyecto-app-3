import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { auth, db } from "../firebase/config"


export default class FormRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            mail: "",
            password: "",
            minibio: "",
            fotoPerfil: "",
            errores: {
                errorUserName: "",
                errorPassword: "",
                errorMail: ""
            },

            errorMailFirebase: "",
        }

    }
    registrarUsuario(name, email, password){
        // validaciones de mail, contrasena, contrasena
        if (this.state.userName == "") {
            this.setState({
                errores: {
                    ...this.state.errores,
                    errorUserName: "Ingresa un nombre valido."
                }
            })
        }
        else if (this.state.mail == "" || this.state.mail.includes("@") == false) {
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
        }

        else {
            auth.createUserWithEmailAndPassword(email, password)
                .then(user => db.collection("users").add({
                    owner: this.state.mail,
                    createdAt: Date.now(),
                    userNameame: this.state.userName,
                    minibio: this.state.minibio,
                    fotoPerfil: this.state.fotoPerfil
                }))
                .then((resp) => console.log(resp))
                .catch((e) => {
                    console.log(e), this.setState({
                        errorMailFirebase: e.message
                    })
                });
        }
    }

    render() {
        return (
            <View>
                <Text>Registrate a mi app</Text>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='Dinos tu nombre'
                        keyboardType='default'
                        value={this.state.userName}
                        onChangeText={(text) => this.setState({ userName: text, errores: { ...this.state.errores, errorUserName: "" } })}
                    />
                    {this.state.errores.errorUserName !== "" ? <Text>{this.state.errores.errorUserName}</Text> : ""}

                    <TextInput
                        style={styles.input}
                        placeholder='Dinos tu email'
                        keyboardType='email-address'
                        value={this.state.mail}
                        onChangeText={(text) => this.setState({ mail: text, errores: { ...this.state.errores, errorMail: "" } })}
                    />
                    {this.state.errores.errorMail !== "" ? <Text>{this.state.errores.errorMail} </Text> : ""}

                    <TextInput
                        style={styles.input}
                        placeholder='Crea una minibio'
                        value={this.state.minibio}
                        onChangeText={(text) => this.setState({ minibio: text })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder='Dinos tu password'
                        keyboardType='default'
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text, errores: { ...this.state.errores, errorPassword: "" } })}

                    />
                    {this.state.errores.errorPassword !== "" ? <Text>{this.state.errores.errorPassword}</Text> : ""}

                    <TextInput
                        style={styles.input}
                        placeholder='Carga tu foto de perfil'
                        keyboardType='default'
                        value={this.state.fotoPerfil}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ fotoPerfil: text })}
                    />

                    {this.state.errorMailFirebase !== "" ? <Text>{this.state.errorMailFirebase}</Text> : ""}

                    <Text
                        style={styles.textLink}
                    >
                        ¿Tienes una cuenta?
                    </Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        <Text> Logueate aquí! </Text>
                    </TouchableOpacity>

                    {this.state.mail== "" || this.state.userName== "" || this.state.password== "" ? "": 
                    <TouchableOpacity
                    onPress={() => this.registrarUsuario(this.state.userName, this.state.mail, this.state.password)}
                    style={styles.btn} >
                    <Text style={styles.textBtn} > Registrame ahora</Text>
                </TouchableOpacity>
}
                    
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'green',
        marginBottom: 24
    },
    btn: {
        backgroundColor: 'purple',
        padding: 16
    },
    textBtn: {
        color: 'white'
    },
    textLink: {
        marginBottom: 24,
        justifyContent: "center"
    }
})



