/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React from 'react';
// import { TextInput, StyleSheet, Button, View } from 'react-native';

// export default function UselessTextInput() {
//   const [value, onChangeText] = React.useState('');

//   return (
//     <View>
//       <TextInput
//         style={{top: 200,left:30, width: 300, height: 40, borderColor: 'gray', borderWidth: 1 }}
//         placeholder='Enter Name to Login'
//         onChangeText={text => onChangeText(text)}
//         value={value}
//       />
//       <View style={{top:260, height: 40, width: 200,left: 60, backgroundColor: 'blue'}}>
//         <Button color = 'white'
//           title="Press me"
//           onPress={() => Alert.alert('Simple Button pressed')}
//         />
//       </View>
//     </View>
//   );
// }
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './Home'
import Login from './Login'

const MainNavigator = createStackNavigator({
  Login: {screen: Login},
  Home: {screen: Home},
});

const App = createAppContainer(MainNavigator);

export default App;