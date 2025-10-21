import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function CardModalScreen() {
  
  let [title, setTitle] = useState('No Title');
  let [content, setContent] = useState('No Content');
  useEffect(()=>{
    const load = async () => {
      let params = (await AsyncStorage.getItem('displayItem'));
      params = JSON.parse(params);
      setTitle(params?.title || 'No Title');
      setContent(params?.content || 'No Content');
    };
    load();
  },[])
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ThemedView style={{ flex: 1, padding: 20, alignItems: 'center' }}>
        <ThemedText style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>
          {title}
        </ThemedText>
        <ThemedText style={{ fontSize: 18 }}>{content}</ThemedText>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

// async function loadData() {
  
// }
