import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Button, StyleSheet, Text, TextInput, View } from 'react-native';

const image = require('./img/campfire-background.png');

const campgroundApiKey = process.env.REACT_APP_CAMPGROUND_API_KEY;

{/* function to search campgrounds by location (latitude-longitude) using Active.com Campground API */}
async function searchCurrentLocation(userLat, userLon) {
  const campgroundSearchUrl = `http://api.amp.active.com/camping/campgrounds?landmarkName=true&landmarkLat=${userLat}&landmarkLong=${userLon}&xml=true&api_key=${campgroundApiKey}`
  const response = await fetch(campgroundSearchUrl);
  console.log(response);
  const xmlData = await response.xml();
  console.log(xmlData);
  console.log("your current location is earth")
}

export default function App() {
  const [text, setText] = useState('');
  return (
    <View  style={styles.container}>

      {/*image background*/}
      <ImageBackground source={image} resizeMode="cover" width="100%" style={styles.image}>
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
    padding: 0,
  },
  image: {
    flex: 1,
    width: viewport-width,
    padding: 0,
  },
});
