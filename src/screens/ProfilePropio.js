import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
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
    this.props.navigation.navigate("Login")
  }

  eliminarPosteo(postId){
    db.collection("posts").doc(postId).delete()
    
  }

  render() {
    return (
      <View style={styles.container}>
  
        <Text> Foto perfil </Text>
        <Image 
            source = {{uri: this.state.usuario.fotoPerfil}}
            style = {styles.img}
        />
        
        <Text> @{this.state.usuario.userName} </Text>
        <Text> {this.state.usuario.owner} </Text>

        {this.state.usuario.minibio !== "" ? <Text> {this.state.usuario.minibio} </Text> : "" }
      
        <TouchableOpacity onPress={()=> this.logOut()}>
          <Text> Logout</Text>
        </TouchableOpacity>

        <Text>
          Cantidad de posteos: {this.state.posteos.length}
        </Text>


        <FlatList
        data={this.state.posteos}
        keyExtractor={(item) => item.id.toString()}
        renderItem= {({item})=> <>
        <Post navigation = {this.props.navigation} data={item.data} id={item.id}/>
                                  <TouchableOpacity
                                    onPress={() => this.eliminarPosteo(item.id)} >
                                
                                    <Text> Eliminar posteo</Text>
                                  </TouchableOpacity> </>
                                  
                                }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 80
  }
})


