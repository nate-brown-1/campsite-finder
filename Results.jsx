import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Results () {

    const searchResults = "Sol Duc Campground";

    return (
        <View style={styles.searchResultsBox}>
            <Text style={styles.resultsText}>The closest campground is...</Text>
            <Text style={styles.resultsText}>{searchResults}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    searchResultsBox: {
        flex: 5,
        backgroundColor: '#FFCC99',
        opacity: 0.75,
        margin: 25,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    resultsText: {
        textAlign: 'center',
        margin: 25,
      },    
});
