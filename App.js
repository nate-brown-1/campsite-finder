import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Button, StyleSheet, Text, TextInput, View } from 'react-native';

const image = require('./img/campfire-background.png');

{/* function to get user location from geolocation API */}
function searchCurrentLocation() {
  console.log("your current location is earth")
}

export default function App() {
  const [text, setText] = useState('');
  return (
    <View  style={styles.container}>

      {/*image background*/}
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <StatusBar color="white" />

      {/*title bar box*/}
      <View
       style={{flex: 1, paddingTop: 48}}>
        <Text style={{padding: 1, fontSize:48, color:"#fff"}}>
          Campsite Finder!
        </Text>
      </View>

      {/*user interaction box*/}
      <View style={{flex: 3}}>

        {/*text input for user defined location*/}
        <TextInput
          style={{height:32}}
          backgroundColor="yellow"
          placeholder="Where do you want to camp?"
          onChangeText={newText => setText(newText)}
          defaultValue={text}
        />

        {/* button to search using geolocation API*/}
        <Button
          title="Use Current Location!"
          onPress={searchCurrentLocation}
        />

      </View>

      {/*results box*/}
      <View style={{flex: 5}} backgroundColor="yellow">
        <Text>Results</Text>
      </View>

      {/*results box*/}
      <View style={{flex: 3}}>
      </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
  },
});
