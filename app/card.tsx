import { TouchableWithoutFeedback, Keyboard, StyleSheet, ScrollView, Button } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import * as Clipboard from "expo-clipboard";
import { Alert } from "react-native";
import React from 'react';
import { router, useFocusEffect, useRouter } from 'expo-router';

export default function CardModalScreen() {
  const router = useRouter();
  let [id, setId] = useState('');
  let [title, setTitle] = useState('No Title');
  let [content, setContent] = useState('No Content');
  const load = async () => {
    let params = (await AsyncStorage.getItem('displayItem'));
    params = JSON.parse(params?);
    setId(params?.id);
    setTitle(params?.title || 'No Title');
    setContent(params?.content || 'No Content');
  };
  useFocusEffect(
    useCallback(()=>{
      load();
    },[])
  )
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 20 }}
    >
        <ThemedView style={{ flex: 1, padding: 20, alignItems: 'center' }}>
        <ThemedText onPress={()=>{copyItem(title)}} style={styles.card}>{title}</ThemedText>
        <ThemedText onPress={()=>{copyItem(content)}} style={styles.card}>{content}</ThemedText>
        <ThemedView>
          <Button title="Delete" color="red" onPress={()=>{handleDelete(id)}} />
          <Button title="Edit" color="rgba(9, 172, 201, 1)" onPress={()=>{router.push('/edititem')}} />
        </ThemedView>
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
async function handleDelete(id: string) {
  let items = JSON.parse(await AsyncStorage.getItem("items"));
  const updatedItems = items.filter((item: any) => item.id !== id);

  await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
  Alert.alert("Deleted");
  setTimeout(()=>{
    router.back();
  },500);
  
}
