import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';


export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likes: 0,
      estaLikeado: false

    }
  }

  componentDidMount() {
    let validacionLike = this.props.data.likes.includes(auth.currentUser.email)
    this.setState({
      estaLikeado: validacionLike
    })
  }

  like() {
    db.collection('posts').doc(this.props.id).update({ likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) })
      .then((resp) => {
        this.setState({ estaLikeado: true })
      })
      .catch((err) => console.log(err))
  }

  unlike() {
    db.collection('posts').doc(this.props.id).update({ likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) })
      .then((resp) => {
        this.setState({ estaLikeado: false })
      })
      .catch((err) => console.log(err))
  }

  irComentar() {
    this.props.navigation.navigate('Comments', { id: this.props.id })
  }

  irAlPerfil() {
    this.props.data.owner === auth.currentUser.email ? this.props.navigation.navigate("ProfilePropio") : this.props.navigation.navigate("ProfileUsuarios", { usuario: this.props.data.owner })
  }




  render() {
    return (
      <View style={styles.home} >
        <TouchableOpacity onPress={() => this.irAlPerfil()}>
          <Text style={styles.usuarios}> {this.props.data.owner}</Text>
        </TouchableOpacity>

        <Image
          source={{ uri: this.props.data.fotoUrl } ? { uri: this.props.data.fotoUrl } : ""}
          style={styles.img}
          resizeMode='contain'
        />
        <Text style={styles.desc} >{this.props.data.descripcion}</Text>
        <View style={styles.like}>
          <Text style={styles.likenum}>
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
            onPress={() => this.irComentar()}>
            <Text style={styles.coments}> Comentarios: {this.props.data.comentarios.length}</Text>
          </TouchableOpacity>

          <FlatList
            data={this.props.data.comentarios.slice(-4).reverse()} // electiva de mostrar 4 comentarios
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.comentsglb}>
                <Text style={styles.usuarios2}>{item.owner}:</Text>
                <Text style={styles.coments2}>{item.comentario}</Text>
              </View>
            )}
          />
        </View>

        <View>

        </View>





      </View>
    )
  }
}

const styles = StyleSheet.create({
  img: {
    height: 200,

    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
  home: {
    backgroundColor: '#d9d9d9',
    margin: 15,
    borderRadius: 10,
  },
  usuarios: {
    padding: 5,
    paddingLeft: 10, 
    color: '#434343',
    fontWeight:'bold',
    textDecorationLine: 'underline',
    backgroundColor: '#b7b7b7', 
    borderRadius: 10,
    
  }, 
  coments: {
    padding: 5,
    marginBottom: 10, 
    color: '#434343',
    fontWeight:'bold',
    backgroundColor: '#d2d2d2'
    
  },
  like: {
    padding: 5, 
    color: '#434343',
    flexDirection: 'row', 
    alignItems: 'center',
  },
  desc: {
    padding: 5,
    marginBottom: 10, 
    color: '#434343',
    backgroundColor: '#d2d2d2'
  },
  usuarios2: {
    paddingBottom: 10 ,
    paddingLeft: 10, 
    paddingRight: 3,
    color: '#434343',
    fontWeight:'bold',
    textDecorationLine: 'underline',
  },
  coments2:{
    color: '#434343',
    paddingBottom: 10,
  },
  likenum: {
    marginLeft: 5,
    marginRight: 3,
  },
  comentsglb:{
    flexDirection: 'row', alignItems: 'center'
  }

})