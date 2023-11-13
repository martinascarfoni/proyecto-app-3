import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../firebase/config'
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';


export default class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
          likes: 0,
          estaLikeado: false

        }
    }

    componentDidMount(){
      let validacionLike = this.props.data.likes.includes(auth.currentUser.email)
      this.setState({
        estaLikeado: validacionLike
      })
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
      this.props.navigation.navigate('Comments', {id: this.props.id})
  }

  irAlPerfil(){
    this.props.data.owner=== auth.currentUser.email? this.props.navigation.navigate("ProfilePropio") : this.props.navigation.navigate("ProfileUsuarios", {usuario: this.props.data.owner})
  }

  


  render() {
    return (
      <View>
        <TouchableOpacity  onPress={()=> this.irAlPerfil()}>
        <Text> {this.props.data.owner}</Text>
        </TouchableOpacity>
        
        <Image
        source = {{uri: this.props.data.fotoUrl} ? {uri: this.props.data.fotoUrl}: "" }
        style = {styles.img}
        resizeMode='contain'
        />
        <Text>{this.props.data.descripcion}</Text>
                <View>
                    <Text>
                        {this.props.data.likes.length}
                    </Text>
                    {
                        this.state.estaLikeado ?
                            <TouchableOpacity
                                onPress={() => this.unlike()}
                            >
                                <FontAwesome
                                    name='heart'
                                    color='red'
                                    size={24}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => this.like()}
                            >
                                <FontAwesome
                                    name='heart-o'
                                    color='red'
                                    size={24}
                                />
                            </TouchableOpacity>
                    }
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => this.irComentar()}
                    >
                    
                        <Text> Comentarios: {this.props.data.comentarios.length}</Text>
                  </TouchableOpacity>
                </View>

                <View>
                    
                </View>



          

        </View>
    )
  }
}

const styles= StyleSheet.create({
  img: {
    height: 200
  }
})