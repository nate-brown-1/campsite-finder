import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Dimensions, Button, ScrollView, StyleSheet, TouchableHighlight, Text, View } from 'react-native';

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
  // console.log(lat);
  // console.log(lon);
  // console.log(campgroundApiKey);
  const campgroundSearchUrl = `http://api.amp.active.com/camping/campgrounds?landmarkName=true&landmarkLat=${lat}&landmarkLong=${lon}&xml=true&api_key=8h5shmpyxpr64q7vyxctbzr4`;
  let response = null;
  try {
    response = await axios.get(campgroundSearchUrl);
    // console.log(response);
    // return response;
  } catch (e) {
    console.log(e);
  }
  // console.log(response.data);
  let xml = new XMLParser().parseFromString(response.data);
  let nearestCampground = (xml.children[0].attributes.facilityName);
  // console.log(nearestCampground);
  return nearestCampground;
  // return response;
  // const xmlResponse = new XMLParser().parseFromString(response);
  // console.log(xmlResponse);
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
        <View style={styles.searchBox}>
          <TouchableHighlight onPress={() => {
            let search = searchCurrentLocation(userLat, userLon);
            console.log(search);
            setSearchResults(search); 
            }}>
            <Text>Search Current Location!</Text>
          </TouchableHighlight>
        </View>

        {/*results box*/}
        <View style={searchResults ? styles.searchResultsBox : styles.resultsBox}>
          {searchResults
            ? (<ScrollView style={styles.scrollView}>
              <Text>{searchResults}</Text>
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
