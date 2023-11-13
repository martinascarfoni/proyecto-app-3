import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import FormComments from '../components/FormComments'
import {db} from '../firebase/config'

export default class Comments extends Component {
    constructor(props) {
        super(props)
        this.state= {
            dataPost: null
        }
    }

    componentDidMount() {
            console.log(this.props.route.params.id)
        db
            .collection('posts')
            .doc(this.props.route.params.id)
            .onSnapshot((doc) => {
                console.log(doc.data())
                if (doc) {
                    this.setState({ dataPost: doc.data() })
                }
            })
    }

    render() {
        return (
            <View>
                { this.state.dataPost !== null ?
                <FlatList
                    data={this.state.dataPost.comentarios}
                    keyExtractor={(item) => item.owner.toString()}
                    renderItem={({ item }) => <View> 
                        <Text>{item.owner}</Text> 
                        <Text>{item.comentario} </Text> 
                        </View>}
                /> :
                <Text>"Aún no hay comentarios"</Text>
            
            }
                

                <FormComments navigation={this.props.navigation} post={this.props.route.params.id} />
            </View>
        )
    }
}