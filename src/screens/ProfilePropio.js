import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { auth, db } from "../firebase/config"
import Post from "../components/Post"


export default class ProfilePropio extends Component {
  constructor(props){
    super(props)
    this.state= {
      usuario:[],
      posteos: []
    }
  }

  componentDidMount(){

    // busco datos del owner
    db.collection('users').where("owner", "==", auth.currentUser.email).onSnapshot((docs)=>{
      let arrUsuario = []
      docs.forEach((doc) => {
        arrUsuario.push({
          id:doc.id,
          data: doc.data()
        })
      })

      this.setState({
        usuario : arrUsuario[0].data
      }, () => console.log(this.state.usuario))

    })

    // busco datos de los posteos del current user
    db.collection('posts').where("owner", "==", auth.currentUser.email).onSnapshot((docs)=>{
      // console.log(docs)
      let arrPosts = []
      docs.forEach((doc) => {
        arrPosts.push({
          id:doc.id,
          data: doc.data()
        })
      })
      
      this.setState({
        posteos : arrPosts
      }, () => console.log(this.state.posteos))

    })
    
  }

  


  logOut(){
    auth.signOut()
    this.props.navigation.navigate("Register")
  }

  borrarPosteo(postId){
    db.collection("posts")
    .doc(postId)
    .delete()
  }


  

  render() {
    return (
      <View>
  
        <Text> Foto perfil </Text>
        <Text> @{this.state.usuario.userName} </Text>
        <Text> {this.state.usuario.owner} </Text>

        {this.state.usuario.minibio !== "" ? <Text> {this.state.usuario.minibio} </Text> : "" }
      
        <TouchableOpacity onPress={()=> this.logOut()}>
          <Text> Logout</Text>
        </TouchableOpacity>


        <FlatList
        data={this.state.posteos}
        keyExtractor={(item) => item.id.toString()}
        renderItem= {({item})=> <Post data={item}/>}
          

        
        />

      </View>
    )
  }
}
