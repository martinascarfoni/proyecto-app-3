import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default class FormSearch extends Component {
  constructor(props) {
    super(props);
  }

  evitarSubmit(evento) {
    evento.preventDefault();
  }

  controlarCambios(text) {
    this.props.actualizarInput(text);
    this.props.filtrarUsuarios(text);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.busqueda}
          placeholder="Busca un perfil aquí..."
          name="busqueda"
          onChangeText={(text) => this.controlarCambios(text)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  busqueda: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
    color: "#cccccc"
  },
});
