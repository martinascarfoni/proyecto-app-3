import React, { Component } from 'react'
import { Text, View , ActivityIndicator} from 'react-native'
import { auth } from "../firebase/config"
import FormRegister from "../components/FormRegister"

export default class Register extends Component {
    constructor(props){
        super(props)
        this.state= {
          hayUsuario: false
        }
    }


    componentDidMount(){
        auth.onAuthStateChanged((user)=>{
            if (user !== null){
                this.props.navigation.navigate('TabNavigation')
            }
        })
        this.setState({
          hayUsuario: true
        })
    }

  render() {
    return (
      <View>
      
        {
          this.state.hayUsuario ?
          <FormRegister navigation={this.props.navigation}/>
          :
          <ActivityIndicator size="large"
          color={'blue'}/>
        }
        
      </View>
    )
  }
}
