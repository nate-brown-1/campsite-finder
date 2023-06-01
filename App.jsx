import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Dimensions, StyleSheet, TouchableHighlight, Text, View } from 'react-native';

import * as Location from 'expo-location';

import Results from './Results';
import Modal from './Modal';

import axios from 'axios';
const XMLParser = require('react-xml-parser');

const image = require('./img/campfire-background.png');

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;


export default function App() {
  const [searchResults, setSearchResults] = useState('');

  const [infoModal, displayInfoModal] = useState(false);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  {/* function to search campgrounds by location (latitude-longitude) using Active.com Campground API */ }
  const searchCurrentLocation = async (userLocation) => {
    const lat = userLocation.coords.latitude;
    const lon = userLocation.coords.longitude;
    const campgroundSearchUrl = `http://api.amp.active.com/camping/campgrounds?landmarkName=true&landmarkLat=${lat}&landmarkLong=${lon}&xml=true&api_key=8h5shmpyxpr64q7vyxctbzr4`;
    let response = null;
    try {
      response = await axios.get(campgroundSearchUrl);
    } catch (e) {
      console.log(e);
    }
    let xml = new XMLParser().parseFromString(response.data);
    let nearestCampground = (xml.children[0].attributes.facilityName);
    console.log(nearestCampground);
    setSearchResults(nearestCampground);
  }


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
          <TouchableHighlight onPress={() => searchCurrentLocation(location)}>
            <Text>Search Current Location!</Text>
          </TouchableHighlight>
        </View>

        {/*results box*/}
        <View style={searchResults ? styles.searchResultsBox : styles.resultsBox}>
          {searchResults
            // ? <Results />
            ? (<View>
              <Text style={styles.resultsText}>The closest campground is...</Text>
              <Text style={styles.resultsText}>{searchResults}</Text>
              </View>
            )
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
    opacity: 0.75,
    margin: 25,
    justifyContent: 'space-around',
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
  resultsText: {
    textAlign: 'center',
    margin: 25,
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
