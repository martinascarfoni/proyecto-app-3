import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from "../firebase/config"
import firebase from 'firebase'

export default class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comentario: '',
    }
  }

  agregarComentario(comentario){
    console.log(this.props.post);
    db
    .collection('posts')
    .doc(this.props.post)
    .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            comentario: comentario
        })
    })
    .then(()=> this.props.navigation.navigate('Home'))
    .catch((e) => console.log(e))
}


  render() {
    return (
      <View>
        
        <TextInput
          style={styles.input}
          placeholder='comenta aquí...'
          keyboardType='default'
          value={this.state.name}
          onChangeText={(text) => this.setState({ comentario: text })}
          multiline={true}
            numberOfLines={2}
        />
       
        <TouchableOpacity style={styles.btn} onPress={() => this.agregarComentario(this.state.comentario)}
        >
          <Text style={styles.textBtn}>Agregar comentario</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'rgba(115, 115, 115, 1)',
    marginBottom: 24,
    color: "#cccccc",
    marginLeft: 10
  },
  btn: {
    backgroundColor: 'purple',
    padding: 16,
    marginBottom: 50
  },
  textBtn: {
    color: '#cccccc',
  
  }
})