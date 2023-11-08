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
    db.collection('users').where("owner", "==", auth.currentUser.email).onSnapshot((docs)=>{
      // console.log(docs)
      let arrDocs = []
      docs.forEach((doc) => {
        arrDocs.push({
          id:doc.id,
          data: doc.data()
        })
      })

      this.setState({
        usuario : arrDocs
      }, () => console.log(this.state.usuario))

    })

    db.collection('posts').where("owner", "==", auth.currentUser.email).onSnapshot((docs)=>{
      // console.log(docs)
      let arrDocs = []
      docs.forEach((doc) => {
        arrDocs.push({
          id:doc.id,
          data: doc.data()
        })
      })
      arrDocs.sort((a,b)=> b.data.createdAt - a.datacreatedAt)
      this.setState({
        posteos : arrDocs
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
        

       
       

        <TouchableOpacity onPress={()=> this.logOut}>
          <Text> Logout</Text>
        </TouchableOpacity>

      </View>
    )
  }
}
