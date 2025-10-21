import { TouchableWithoutFeedback, Keyboard, StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import * as Clipboard from "expo-clipboard";
import { Alert } from "react-native";

export default function CardModalScreen() {

  let [title, setTitle] = useState('No Title');
  let [content, setContent] = useState('No Content');
  useEffect(() => {
    const load = async () => {
      let params = (await AsyncStorage.getItem('displayItem'));
      params = JSON.parse(params);
      setTitle(params?.title || 'No Title');
      setContent(params?.content || 'No Content');
    };
    load();
  }, [])
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 20 }}
    >
        <ThemedView style={{ flex: 1, padding: 20, alignItems: 'center' }}>
        <ThemedText onPress={()=>{copyItem(title)}} style={styles.card}>{title}</ThemedText>
        <ThemedText onPress={()=>{copyItem(content)}} style={styles.card}>{content}</ThemedText>
      </ThemedView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: '#1e1e1eff',
    width: '100%',
    padding: 5,
    borderRadius: 7,
    textAlign: 'center'
  }
})

async function copyItem(data: string) {
  await Clipboard.setStringAsync(data);
  Alert.alert("Text Copied");
}