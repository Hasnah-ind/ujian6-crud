import React, { Component, useState} from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Picker} from '@react-native-picker/picker'
import styles from './styles'
import {View, Image, FlatList,  ImageBackground,Alert} from 'react-native'
import { Text, TextInput, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import * as ImagePicker from 'react-native-image-picker'
import Geolocation from '@react-native-community/geolocation'


 const options={
title: 'my pic app',
takePhotoButtonTitle: 'Take photo with your camera',
chooseFromLibraryButtonTitle: 'Choose photo from library',
}
export default class Input extends Component {
constructor(props){
    super(props);
        this.state = {
            gender : '',
            status : '',
            nama   : '',
            umur   : '',
            fileImage : null,
            uri: '',
            Latitude : '',
            Longitude : ''

        }
    
}

requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        // If Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.PERMISSIONS_CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        this.captureCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        console.log(response);
        this.setState({uri: response.uri});
        this.setState({fileImage: response});
      },
    );
  };

  captureCamera = () =>
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        console.log(response);
        this.setState({uri: response.uri});
        this.setState({fileImage: response});
      },
    );

AddData = () =>{
    
   firestore()
  .collection('biodata')
  .add({
    nama : this.state.nama,
    gender : this.state.gender,
    umur : this.state.umur,
    status : this.state.status,
    uri : this.state.uri,
    Latitude : this.state.Latitude,
    Longitude : this.state.Longitude
  })
  .then(() => {
    Alert.alert('Data berhasil ditambahkan');
  });
}


getLocation=()=>{
    if(this.hasLocationPermission){
     Geolocation.getCurrentPosition(
    (info) => {
    const {coords} = info;

    console.log(coords.latitude);
    console.log(coords.longitude);
    this.setState({
      Latitude : coords.latitude,
      Longitude: coords.longitude
    })


            
    },
   (error) => console.log(error),
     {
       enableHighAccuracy: false,
       timeout: 2000,
       maximumAge: 3600000,
      },
  );
    }
  } 


    render() {
        return (
             <View style={styles.container}>
            <KeyboardAwareScrollView
              style={{flex: 1, width: '100%'}}
              keyboardShouldPersistTaps="always">
                <Image
                source={ this.state.fileImage}
                style={{height: 100, width: 100, alignSelf:'center'}}/>
               
             
             
              <TextInput
                style={styles.input}
                placeholder="Nama"
                placeholderTextColor="#aaaaaa"
                onChangeText = {(nama)=> this.setState({nama})}
               
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              <Picker
                selectedValue={this.state.gender}
                style={styles.input}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ gender: itemValue })
                }
                underlineColorAndroid="transparent"
                autoCapitalize="none">
                <Picker.Item label="Pilih Gender" value=" " color="#aaaaaa"/>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="Female" />   
              </Picker>
               <TextInput
                style={styles.input}
                placeholder="Umur"
                placeholderTextColor="#aaaaaa"
                onChangeText = {(umur)=> this.setState({umur})}
               
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              <Picker
                selectedValue={this.state.status}
                style={styles.input}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ status: itemValue })
                }
                underlineColorAndroid="transparent"
                autoCapitalize="none">
                <Picker.Item label="Pilih Status" value=" " color="#aaaaaa"/>
                <Picker.Item label="Single" value="single" />
                <Picker.Item label="Married" value="married" />   
              </Picker>
                <TextInput
                style={styles.input}
                placeholder="Nama"
                placeholderTextColor="#aaaaaa"
                underlineColorAndroid="transparent"
                autoCapitalize="none">{this.state.Latitude}, {this.state.Longitude}</TextInput>

                <TouchableOpacity
                
                style={styles.button}
                onPress={this.getLocation}>
                <Text style={styles.buttonTitle}>Add Location</Text>
              </TouchableOpacity>
               

              <TouchableOpacity
                
                style={styles.button}
                onPress={this.captureCamera}>
                <Text style={styles.buttonTitle}>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                
                style={styles.button}
                onPress={this.pickImage}>
                <Text style={styles.buttonTitle}>Gallery</Text>
              </TouchableOpacity>
     

              <TouchableOpacity
                
                style={styles.button}
                onPress={this.AddData}>
                <Text style={styles.buttonTitle}>Add Data</Text>
              </TouchableOpacity>
              
               </KeyboardAwareScrollView>
              </View>
              
             
        )
    }


    hasLocationPermission = async () => {
     
  
      if (Platform.OS === 'android' && Platform.Version < 23) {
        return true;
      }
  
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
  
      if (hasPermission) {
        return true;
      }
  
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
  
      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
  
      if (status === PermissionsAndroid.RESULTS.DENIED) {
        ToastAndroid.show(
          'Location permission denied by user.',
          ToastAndroid.LONG,
        );
      } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        ToastAndroid.show(
          'Location permission revoked by user.',
          ToastAndroid.LONG,
        );
      }
  
      return false;
    };
}
