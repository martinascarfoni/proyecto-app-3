import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../firebase/config'
import firebase from 'firebase';

export default class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
          likes: 0,
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

    irComentar(){
      this.props.navigation.navigate('comments', {post: this.props.id})
  }
componentDidMount(){
  console.log(this.props);
}

  render() {
    return (
      <View>
        <Image
        source = {{uri: this.props.data.fotoUrl} ? {uri: this.props.data.fotoUrl}: "" }
        style = {styles.img}
        resizeMode='contain'
        />
            <Text>Soy el posteo de: {this.props.data.owner}</Text>
            <Text>Mi comentario es: {this.props.data.descripcion}</Text>
            <Text>Likes</Text>

            <TouchableOpacity onPress={()=> this.irComentar()}>
            <Text>Ver Comentarios</Text>
        </TouchableOpacity>

        </View>
    )
  }
}

const styles= StyleSheet.create({
  img: {
    height: 200
  }
})