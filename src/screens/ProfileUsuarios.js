import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import { auth, db } from "../firebase/config"
import Post from "../components/Post"

export default class PerfilUsuarios extends Component {
    constructor() {
        super()
        this.state = {
            usuarios: [],
            posteos: []
        }
    }


    componentDidMount() {
        console.log(this.props.route.params.usuario);

        db.collection('users').where('owner', '==', this.props.route.params.usuario).onSnapshot((docs) => {
            let arrDocs = []
            docs.forEach((doc) => {
                arrDocs.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                usuarios: arrDocs
            }, () => console.log(this.state.usuarios))

        })

        db.collection('posts').where('owner', '==', this.props.route.params.usuario).onSnapshot((docs) => {
            let arrDocs = []
            docs.forEach((doc) => {
                arrDocs.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            arrDocs.sort((a, b) => b.data.createdAt - a.data.createdAt)
            this.setState({
                posteos: arrDocs
            }, () => console.log(this.state.posteos))

        })
    }

    render() {
        return (
            <View style={styles.container} >
                <View>
                
                <FlatList
                    data={this.state.usuarios}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <View>

                        <Text style={styles.txt} > @{item.data.userName}</Text>
                        {item.data.fotoPerfil != '' ?
                            <Image
                                source={{uri: item.data.fotoPerfil}}
                                style={styles.img}
                                resizeMode='contain'
                            />
                            :
                            ''
                        }
                        <Text style={styles.txt}> {item.data.owner}</Text>
                        
                        {item.data.minibio ?
                            <Text style={styles.txt}>{item.data.minibio}</Text>
                            :
                            ''
                        }
                    </View>}

                />

                <View>
                    <Text style={styles.txt}>posteos de {this.props.route.params.usuario} </Text>
                    <Text style={styles.txt}>Cantidad de posteos: {this.state.posteos.length} </Text>
                    <FlatList
                        data={this.state.posteos}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>
                            <View>
                                <Post navigation={this.props.navigation} data={item.data} id={item.id} />
                            </View>
                        }
                    />
                </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      backgroundColor: '#39343d'
    },
    img: {
      height: 100,
      width: 100,
      borderRadius: 80
    },
    txt: {
        color: "#cccccc",
        margin: 5

    }
  })