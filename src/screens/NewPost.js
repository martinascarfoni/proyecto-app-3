import React, { Component } from 'react'
import { Text, View } from 'react-native'
import FormPost from '../components/FormPost'
import { db, auth } from "../firebase/config"
import { TouchableOpacity } from 'react-native-web'

export default class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      descripcion: '',
      urlImg: '',
      paso1: true
    }
  }

  onSubmit({
    description
  }) {
    db.collection('posts').add({
      owner: auth.currentUser.email,
      description: description,
      // img: this.state.img,
      createdAt: Date.now(),
      likes: []
    })
      .catch((e) => console.log(e))
  }

  actualizarDescripcion(text) {
    this.state({
      descripcion: text
    })
  }

  actualizarFotourl(url) {
    this.setState({
      urlFoto: url,
      paso1: false
    })
  }


render() {
return (
  <View>
        <Text>Posteo nuevo</Text>
        {this.state.paso1 ? (
          <View>
            <CamaraPost actualizarFotourl={(url) => this.actualizarFotourl(url)} />
          </View>
        ) : (
          <View>
            <FormPost
              actualizarDescripcion={(descripcion) => this.actualizarDescripcion(descripcion)}
              estadoDescripcion={this.state.descripcion}
            />
            <TouchableOpacity onPress={() => this.onSubmit({ descripcion: this.state.descripcion })}>
              <Text>Enviar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
)
  

}}
