import React, { Component } from 'react'
import Home from './src/Form/Home'
import Input from './src/Form/Input'
import Read from './src/Form/Read'
import Edit from './src/Form/Edit'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
       <NavigationContainer>
       <Stack.Navigator>
       
          
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Input" component={Input} />
          <Stack.Screen name="List Data diri" component={Read} />
          <Stack.Screen name="Edit" component={Edit} />
         
           
          
       </Stack.Navigator>
     </NavigationContainer>
    )
  }
}
