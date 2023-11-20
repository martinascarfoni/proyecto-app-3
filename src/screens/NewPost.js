import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import FormPost from '../components/FormPost'
import { db, auth } from "../firebase/config"
import { TouchableOpacity } from 'react-native-web'
import CamaraPost from '../components/CamaraPost'

export default class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      descripcion: '',
      urlFoto: "",
      paso1: true
    }
  }

  onSubmit({
    fotoUrl,
    descripcion
  }) {
    db.collection('posts').add({
      owner: auth.currentUser.email,
      descripcion: descripcion,
      createdAt: Date.now(),
      fotoUrl: fotoUrl,
      likes: [],
      comentarios: []
    })
    .then(()=> {
      this.setState({
        descripcion: '',
        urlFoto: "",
        paso1: true
      })
      this.props.navigation.navigate("Home")
    })
    .catch((e) => console.log(e))
  }

  actualizarDescripcion(text) {
    this.setState({
      descripcion: text
    })
  }


  actualizarFotoUrl(url){
    this.setState({
      urlFoto: url,
      paso1: false
    })
  }


render() {
return (
  <View style={styles.container}>
        <Text style={styles.titulos}>Posteo nuevo</Text>

        {
          this.state.paso1 ?
          <CamaraPost
          actualizarFotoUrl={(url)=> this.actualizarFotoUrl(url)}
          />
        
          :
          <>
           <View>
            <FormPost
              actualizarDescripcion={(descripcion) => this.actualizarDescripcion(descripcion)}
              estadoDescripcion={this.state.descripcion}/>

            <TouchableOpacity onPress={() => this.onSubmit({ 
              descripcion: this.state.descripcion,
              fotoUrl: this.state.urlFoto
              })}
              >
              <Text style={styles.elmu2}>Enviar</Text>
            </TouchableOpacity>
  </View>

         </>
        }
        
         
        
      </View>
)
}}


const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#39343d'
    },
  titulos:{
    padding: 5,
    marginBottom: 10, 
    marginTop: 10,
    color: 'rgb(204, 204, 204)',
    fontWeight:'bold',
    fontSize: 20
  },
  elmu2: {
    color: 'rgb(204, 204, 204)',
    padding: 10, 
    fontWeight: 'bold' 
  }
})