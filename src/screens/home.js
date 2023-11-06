import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import {db} from '../firebase/config'
import Post from '../components/Post';

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state= {
      posteos:[]
    }

  }
  componentDidMount(){
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs =>{
      let arrayPosteos= []
      docs.forEach(doc => {
        arrayPosteos.push({
          id: doc.id,
          data: doc.data()
        })
      })
      this.setState({
        posteos: arrayPosteos
      })
    
    })
  }
  render() {
    return (
      <View>
        <FlatList 
        data= {this.state.posteos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <Post data={item}/>}
        /> 
      </View>
    )
  }
}
