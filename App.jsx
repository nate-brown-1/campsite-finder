import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Dimensions, Button, StyleSheet, TouchableHighlight, Text, View } from 'react-native';

import axios from 'axios';

const XMLParser = require('react-xml-parser');

const image = require('./img/campfire-background.png');
const campgroundApiKey = process.env.REACT_APP_CAMPGROUND_API_KEY;
const userLat = 47.8021;
const userLon = -123.6044;

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

{/* function to search campgrounds by location (latitude-longitude) using Active.com Campground API */ }
async function searchCurrentLocation(lat, lon) {
  console.log(lat);
  console.log(lon);
  {/*REACT_APP_CAMPGROUND_API_KEY=8h5shmpyxpr64q7vyxctbzr4
  const campgroundSearchUrl = `http://api.amp.active.com/camping/campgrounds?landmarkName=true&landmarkLat=${lat}&landmarkLong=${lon}&xml=true&api_key=${campgroundApiKey}`
  const response = await fetch(campgroundSearchUrl);*/}
  let response = null;
  try {
    response = await axios.get('http://api.amp.active.com/camping/campgrounds?landmarkName=true&landmarkLat=47.8021&landmarkLong=-123.6044&xml=true&api_key=8h5shmpyxpr64q7vyxctbzr4')
      .then(response => console.log(response));
  } catch (e) {
    console.log(e)
  }
  console.log(response);
  // const xmlData = await response.xml();
  // console.log(xmlData);
  // console.log("your current location is earth")
}

export default function App() {
  const [searchResults, setSearchResults] = useState('');
  return (
    <View style={styles.screenContainer}>

      {/*image background*/}
      <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
        <StatusBar color="white" />

        {/*title bar box*/}
        <View style={styles.titleBarBox}>
          <Text style={{ padding: 1, fontSize: 48, color: "#fff" }}>
            Campsite Finder!
          </Text>
        </View>

        {/* button to search using geolocation API*/}
        <TouchableHighlight onPress={ () => { searchCurrentLocation() } }>
        <View style={styles.searchBox} onPress={() => { searchCurrentLocation(userLat, userLon)}}>
          <Text>Search Current Location!</Text>
        </View>
        </TouchableHighlight>

        {/*results box*/}
        <View style={searchResults ? styles.searchResultsBox : styles.resultsBox}>
          {searchResults
            ? (<ScrollView style={styles.scrollView}>
              <Text>Your Search Results!</Text>
            </ScrollView>)
            : (<Text>Results Go Here!</Text>)}
        </View>

        {/*about box*/}
        <View style={styles.aboutBox}>
          <Text>About This App</Text>
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    width: screenWidth,
    height: screenHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  imageBackground: {
    width: screenWidth + 2,
    height: screenHeight + 2,
    flex: 1,
    padding: 0,
  },
  titleBarBox: {
    flex: 2,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#FFCC99',
    opacity: 0.75,
    margin: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResultsBox: {
    flex: 5,
    backgroundColor: '#FFCC99',
    margin: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsBox: {
    flex: 5,
    backgroundColor: '#FFCC99',
    opacity: 0.5,
    margin: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutBox: {
    flex: 1,
    backgroundColor: '#FFCC99',
    opacity: 0.75,
    margin: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
