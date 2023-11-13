import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
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
        db.collection('users').where('owner', '==', this.props.route.params.user).onSnapshot((docs) => {
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

        db.collection('posts').where('owner', '==', this.props.route.params.user).onSnapshot((docs) => {
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
            <View>
                <FlatList
                    data={this.state.usuarios}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <View>

                        <Text>Usuario: {item.data.userName}</Text>
                        {item.data.fotoPerfil != '' ?
                            <Image
                                source={item.data.fotoPerfil}
                                style={styles.img}
                                resizeMode='contain'
                            />
                            :
                            ''
                        }
                        <Text>Email: {item.data.owner}</Text>
                        {item.data.minibio ?
                            <Text>Minibio: {item.data.minibio}</Text>
                            :
                            ''
                        }
                    </View>}

                />

                <View>
                    <Text>posteos de {this.props.route.params.user} </Text>
                    <Text>Cantidad: {this.state.posteos.length} </Text>
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
        )
    }
}