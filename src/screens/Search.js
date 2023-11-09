import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native'
import {db} from '../firebase/config'
import Usuario from '../components/Usuario'

export default class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchData: [],
      valorInput: [],
      busqueda: true
    }
  }

  filtrarUsuarios(input){
    db.collection('users').where("userName", "==", input).onSnapshot((docs)=>{
      let arrUsuarios = []
      docs.forEach(doc => {
        arrUsuarios.push({
          id: doc.id,
          data: doc.data()
        })
      })
      this.setState({
        searchData: arrUsuarios,
        busqueda: false
      }, () => console.log(this.state.searchData))
    })
  }
  
  render() {
    return (
        this.state.busqueda ? 
        <>
        <Text>FormSearch</Text>
        <TextInput
            style = {styles.input}
            placeholder = 'Busca el usuario'
            keyboardType = 'default'
            value = {this.state.valorInput}
            onChangeText = { (text) => this.setState({valorInput: text})}
        />
        <TouchableOpacity onPress = {() => this.filtrarUsuarios(this.state.valorInput)} style={styles.btn}>
            <Text>Buscar</Text>
        </TouchableOpacity>
        </>
        :
        <>
        <FlatList 
        data= {this.state.searchData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <Usuario data={item.data} id={item.id} />}
        />  
        </>
    )
  }
}

const styles = StyleSheet.create({
  input:{
      borderWidth: 1,
      borderColor: 'green',
      marginBottom: 24
  },
  btn:{
      backgroundColor:'purple',
      padding:16
  },
  textBtn:{
      color:'white'
    }
})