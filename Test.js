import React, { Component } from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';

export default class Test extends Component {
    render() {

Camera = () =>{
ImagePicker.openCamera({
  width: 300,
  height: 400,
  cropping: true,
}).then(image => {
  console.log(image);
});
}


Gallery = () => {
    ImagePicker.openPicker({
  width: 300,
  height: 400,
  cropping: true
}).then(image => {
  console.log(image);
});
}

        return (
            <View>
                <TouchableOpacity onPress={Gallery}>
                <Text>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={Camera}>
                <Text>Camera</Text>
                </TouchableOpacity>
                <View></View>
            </View>
        )
    }
}
