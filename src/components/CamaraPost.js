import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { storage } from '../firebase/config'

export default class CamaraPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            mostrarCamera: true,
            permisos: false,
            urlTemp: ''
        }
        this.metodosDeCamara= null
    }

componentDidMount(){
    Camera.requestCameraPermissionsAsync()
    .then((resp) => this.setState({permisos: true}))  // si entramos en el then, el usuario aceptó los permisos
    .catch((err) => console.log(err))
}

tomarFoto(){
  this.metodosDeCamara.takePictureAsync()
  .then(imgTemp => this.setState({
    urlTemp: imgTemp.uri,
    mostrarCamera: false
  }))
  .catch(err => console.log(err))
}

aceptarFoto(){
  fetch(this.state.urlTemp)
  .then(resp => resp.blob())
  .then(img => {
      const ref = storage.ref(`fotos/${Date.now()}.jpg`)
      ref.put(img)
      .then(resp =>{
          ref.getDownloadURL()
          .then((url)=> this.props.actualizarFotoUrl(url))
      })
      .catch(err => console.log(err))
  })
  .catch(err=> console.log(err))

}

rechazarFoto(){
  this.setState({
      mostrarCamera: true,
      urlTemp: ''
  })
}


  render() {
    return (
      <View style={styles.container}>
        {
          this.state.permisos && this.state.mostrarCamera ?
          <>
          <Camera 
              style={styles.camara}
              type={Camera.Constants.Type.back}  // que tipo de camara, frontal o trasera
              ref={(metodosDeCamara)=> this.metodosDeCamara =  metodosDeCamara}
          
          />
          <TouchableOpacity onPress={() => this.tomarFoto()}>
            <Text style={styles.elmu2}>Tomar foto</Text> 
            {/* poner icono */}
          </TouchableOpacity>
          </>
          :
          this.state.permisos && this.state.mostrarCamera === false ?
          <>
          <Image
            source={{uri : this.state.urlTemp}}
            style = {styles.img}
            resizeMode={'contain'}
          />
          <TouchableOpacity onPress={() => this.aceptarFoto()}>
            <Text style={styles.elmu2}>Guardar foto</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.rechazarFoto()}>
            <Text style={styles.elmu2}>Rechazar foto</Text>
          </TouchableOpacity>
          </>
          :
          <Text style={styles.elmu} > No tienes permisos para usar la camara</Text>
        }

      </View>
    )
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1
  },
  camara: {
    height: 300,
  },
  img: {
    height: 300
  },
  elmu: {
    color: '#ff6b6b',
    padding: 10, 
    fontWeight: 'bold'
  },
  elmu2: {
    color: 'rgb(204, 204, 204)',
    padding: 10, 
    fontWeight: 'bold' 
  }
})