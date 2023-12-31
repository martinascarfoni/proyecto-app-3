import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import { auth, db } from "../firebase/config"
import Post from "../components/Post"
import { getAuth, deleteUser } from "firebase/auth";



export default class ProfilePropio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usuario: [],
      posteos: [],
      id: ""
    }
  }

  componentDidMount() {

    // busco datos del owner
    db.collection('users').where("owner", "==", auth.currentUser.email).onSnapshot((docs) => {
      let arrUsuario = []
      docs.forEach((doc) => {
        arrUsuario.push({
          id: doc.id,
          data: doc.data()
        })
      })

      this.setState({
        usuario: arrUsuario[0].data,
        id: arrUsuario[0].id
      }, () => console.log(this.state.usuario, this.state.id))

    })

    // busco datos de los posteos del current user
    db.collection('posts').where("owner", "==", auth.currentUser.email).onSnapshot((docs) => {
      // console.log(docs)
      let arrPosts = []
      docs.forEach((doc) => {
        arrPosts.push({
          id: doc.id,
          data: doc.data()
        })
      })

      this.setState({
        posteos: arrPosts
      }, () => console.log(this.state.posteos))

    })

  }

  logOut() {
    auth.signOut()
    this.props.navigation.navigate("Login")
  }

  eliminarPosteo(postId) {
    db.collection("posts").doc(postId).delete()

  }

  eliminarUsuario(userId) {
    const user = auth.currentUser;
    const userEmail = user.email;
    db.collection('users')
      .where('owner', '==', userEmail)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              user.delete()
                .then(() => {
                  console.log('Usuario eliminado correctamente');
                  this.props.navigation.navigate('Login');
                })
                .catch((error) => {
                  console.error('Error al eliminar usuario:', error);
                });
              console.log('Datos del usuario eliminados correctamente');
            })
            .catch((error) => {
              console.error('Error al eliminar datos del usuario:', error);
            });
        });
      })
      .catch((error) => {
        console.error('Error al buscar datos del usuario:', error);
      });

  }


  render() {
    return (
      <View style={styles.container}>

        <Image
          source={{ uri: this.state.usuario.fotoPerfil }}
          style={styles.img}
        />

        <Text style={styles.titulos}> @{this.state.usuario.userName} </Text>
        <Text style={styles.titulos}> {this.state.usuario.owner} </Text>

        {this.state.usuario.minibio !== "" ? <Text style={styles.titulos}> {this.state.usuario.minibio} </Text> : ""}
        <View style={styles.cont2}>
          <TouchableOpacity onPress={() => this.logOut()}>
            <Text style={styles.lgo}> Logout</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => this.eliminarUsuario()}>
            <Text style={styles.elmu}> Eliminar mi usuario</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.titulos} >
          Cantidad de posteos: {this.state.posteos.length}
        </Text>


        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <>
            <Post navigation={this.props.navigation} data={item.data} id={item.id} />
            <TouchableOpacity
              onPress={() => this.eliminarPosteo(item.id)} >

              <Text style={styles.elmpost} > Eliminar posteo</Text>
            </TouchableOpacity> </>

          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#39343d',
  },
  titulos: {
    padding: 5, 
    color: '#cccccc'
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 80
  },
  elmpost: {
    color: '#ff6b6b',
    padding: 10,
    marginBottom: 10, 
    fontWeight: 'bold'
  },
  elmu:{
    color: '#ff6b6b',
    padding: 10, 
    fontWeight: 'bold',
  },
  lgo: {
    color: '#cccccc',
    padding: 10, 
    fontWeight: 'bold',
  },
  cont2: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})


