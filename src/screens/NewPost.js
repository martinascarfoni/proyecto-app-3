import React, { Component } from 'react'
import { Text, View } from 'react-native'
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
    descripcion
  }) {
    db.collection('posts').add({
      owner: auth.currentUser.email,
      descripcion: descripcion,
      createdAt: Date.now(),
      likes: []
    })
    .then(()=> this.props.navigation.navigate("Home"))
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
  <View>
        <Text>Posteo nuevo</Text>

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

            <TouchableOpacity onPress={() => this.onSubmit({ descripcion: this.state.descripcion })}>
              <Text>Enviar</Text>
            </TouchableOpacity>
          </View>

         </>
        }
        
         
        
      </View>
)
  

}}
