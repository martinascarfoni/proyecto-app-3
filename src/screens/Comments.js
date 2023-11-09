import { Text, View } from 'react-native'
import React, { Component } from 'react'
import FormComments from '../components/FormComments'

export default class Comments extends Component {
    constructor(props) {
        super(props)
    }

    // componentDidMount(){
    //     db.collection('comments').where().orderBy('createdAt', 'asc').onSnapshot(docs =>{
    //         let arrayPosteos= []
    //         docs.forEach(doc => {
    //           arrayPosteos.push({
    //             id: doc.id,
    //             data: doc.data()
    //           })
    //         })
    //         this.setState({
    //           posteos: arrayPosteos
    //         })

    //       })
    // }

    render() {
        return (
            <View>
                {/* <FlatList
                    data={this.state.posteos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Post navigation={this.props.navigation} data={item.data} id={item.id} />}
                /> */}

                <FormComments navigation={this.props.navigation} />
            </View>
        )
    }
}