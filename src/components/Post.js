import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../firebase/config'
import firebase from 'firebase';

export default class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
          likes:0,
          estaLikeado: false

        }
    }
    

    like(){
      db.collection('posts').doc(this.props.id).update({likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)})
      .then((resp)=>{
        this.setState({estaLikeado:true})
      })
      .catch((err) => console.log(err))
    }

    unlike(){
      db.collection('posts').doc(this.props.id).update({likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)})
      .then((resp)=>{
        this.setState({estaLikeado:false})
      })
      .catch((err) => console.log(err))
    }

  render() {
    return (
      <View>
            <Text>Soy el posteo de: {this.props.data.data.owner}</Text>
            <Text>Mi comentario es: {this.props.data.data.desccription}</Text>
        </View>
    )
  }
}