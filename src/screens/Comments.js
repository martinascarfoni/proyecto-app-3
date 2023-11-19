import { Text, View, FlatList, StyleSheet } from 'react-native'
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
                    this.setState({ dataPost: doc.data() }, console.log(this.state.dataPost))
                }
            })
    }

    render() {
        return (
            <View  style={styles.container}>
                { this.state.dataPost !== null ? 
                this.state.dataPost.comentarios.length > 0 ?
    
                <FlatList style={styles.coment}
                    data={this.state.dataPost.comentarios}
                    keyExtractor={(item) => item.owner.toString()}
                    renderItem={({ item }) => <View  > 
                            <View style={styles.comentsglb}>
                            <Text style={styles.usuarios2}>{item.owner}:</Text>
                            <Text style={styles.coments2}>{item.comentario}</Text>
                        </View>
                        
                        </View>}
                /> :
                <Text style={styles.txt}>Aún no hay comentarios</Text>  :
                ""
            
            }
                

                <FormComments navigation={this.props.navigation} post={this.props.route.params.id} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#39343d'
      }, 
    usuarios2: {
        paddingBottom: 10 ,
        paddingLeft: 10, 
        paddingRight: 3,
        color: '#cccccc',
        fontWeight:'bold',
        textDecorationLine: 'underline',
      },
      coments2:{
        color: '#cccccc',
        paddingBottom: 10,
      },
      comentsglb:{
        flexDirection: 'row', alignItems: 'center',
        
      },
      coment: {
        margin: 20
      },
      txt: {
        color: "white",
        margin: 20
      }
    
  })