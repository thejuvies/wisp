import { Image } from 'expo-image';
import { Platform, StyleSheet, ScrollView,Button, View, Alert, Linking } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { red } from 'react-native-reanimated/lib/typescript/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabTwoScreen() {
  return (
    <>
      <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Settings
        </ThemedText>
        <View style={{marginTop:20,borderRadius:10, overflow: 'hidden',borderWidth: 0}}>
          <ThemedView style={styles.buttonContainer}><Button title='Delete all' color={'red'} onPress={deleteAll}></Button></ThemedView>
          <ThemedView style={styles.buttonContainer}><Button title='Visit Website' onPress={openWebsite}></Button></ThemedView>
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
}

async function deleteAll() {
  await AsyncStorage.setItem('items','');
  setTimeout(()=>{
    Alert.alert('All items deleted');
  },500)
}
async function openWebsite() {
  await Linking.openURL('https://wispapp.pages.dev/');
}
const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 0.5,
    borderBottomColor: '#333333ff',
    padding:2,
    alignItems:'flex-start'
  },
  container: {
    flex: 1
  },
  scrollContainer: {
    padding: 10,
    flex:1,
    paddingTop:30,
    paddingLeft: 10
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});
