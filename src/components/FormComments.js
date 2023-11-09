import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from "../firebase/config"

export default class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comentario: '',
    }
  }

  agregarComentario(comentario) {
    console.log(comentario)
  }

  onSubmit({
    descripcion
  }) {
    db.collection('comments').doc(this.props.postId).add({
      owner: auth.currentUser.email,
      descripcion: descripcion,
      createdAt: Date.now(),
    })
      .then(() => this.props.navigation.navigate("TabNavigation"))
      .catch((e) => console.log(e))
  }


  render() {
    return (
      <View>
        <Text>Comentarios</Text>
        <TextInput
          style={styles.input}
          placeholder='comentario'
          keyboardType='default'
          value={this.state.name}
          onChangeText={(text) => this.setState({ comentario: text })}
        />
        <TouchableOpacity onPress={() => this.onSubmit({
          descripcion: this.state.comentario,
        })}
        >
          <Text>Agregar comentario</Text>
        </TouchableOpacity>
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
  }
})