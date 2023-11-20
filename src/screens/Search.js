import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native'
import { db } from '../firebase/config'
import Usuario from '../components/Usuario'
import FormSearch from "../components/FormSearch"
import { FontAwesomeIcon } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchData: "",
      valorInput: "",
      busqueda: true,
      backup: []
    }
  }

  componentDidMount() {
    db.collection('users').onSnapshot((docs) => {
      let arrUsuarios = []
      docs.forEach(doc => {
        arrUsuarios.push({
          id: doc.id,
          data: doc.data()
        })
      })
      this.setState({
        backup: arrUsuarios,
      }, () => console.log(this.state.backup))
    })
  }

  filtrarUsuarios(input) {
    let usersF = this.state.backup.filter((elm) => elm.data.userName.toLowerCase().includes(input.toLowerCase()) ||
      elm.data.owner.toLowerCase().includes(input.toLowerCase())

    )
    this.setState({
      searchData: usersF,
      busqueda: false
    })
  }

  actualizarInput(valor) {
    this.setState({
      valorInput: valor
    })
  }




  render() {
    return (
      <>
        <View style={styles.container}>


        {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> */}
          <FormSearch filtrarUsuarios={(nombre) => this.filtrarUsuarios(nombre)} actualizarInput={(valor) => this.actualizarInput(valor)} />


          {this.state.valorInput !== "" ? (
            this.state.searchData.length != 0 ?
              <FlatList
              style={styles.flat}
                data={this.state.searchData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Usuario  data={item.data} id={item.id} navigation={this.props.navigation} />}
              />
              :
              <Text style={styles.textBtn}>No se han encontrado resultados</Text>) : (
            ""
          )}

        </View>
      </>
    )
  }
}



const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'green',
    marginBottom: 24
  },
  btn: {
    backgroundColor: 'purple',
    padding: 16
  },
  textBtn: {
    color: '#cccccc',
    marginLeft: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#39343d'
  },
})