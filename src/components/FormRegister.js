import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { auth, db } from "../firebase/config"
import Login from "../screens/Login"



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
                    userName: this.state.userName,
                    minibio: '',
                    fotoPerfil: ''
                }))
                .then((resp) => {
                    console.log(resp);
                    this.props.navigation.navigate('InfoAdicionalUser', {docId: resp.id})
                })
                .catch((e) => {
                    console.log(e), this.setState({
                        errorMailFirebase: e.message
                    })
                });
        }
    }

    render() {
        return (
            <View style={styles.Loginformu}>
                <Text style={styles.titulos}>Registrate a mi app</Text>

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
                        placeholder='Dinos tu password'
                        keyboardType='default'
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text, errores: { ...this.state.errores, errorPassword: "" } })}

                    />

                    <TextInput
                        style={styles.input}
                        placeholder='Crea una minibio'
                        value={this.state.minibio}
                        onChangeText={(text) => this.setState({ minibio: text })}
                    />

                    {this.state.errores.errorPassword !== "" ? <Text>{this.state.errores.errorPassword}</Text> : ""}

                    {this.state.errorMailFirebase !== "" ? <Text>{this.state.errorMailFirebase}</Text> : ""}

                    <Text
                        style={styles.titulos}
                    >
                        ¿Tienes una cuenta?
                    </Text>
                    
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        <Text style={styles.regi}> Logueate aquí! </Text>
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
        backgroundColor: 'rgba(235, 235, 235, 0.7))',
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

    })




