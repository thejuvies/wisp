import { View, TextInput, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModalScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const saveItem = async () => {
    try {
      const stored = await AsyncStorage.getItem('items');
      const items = stored ? JSON.parse(stored) : [];

      const newItem = { id: Date.now(), title, content };
      const updatedItems = [newItem, ...items];

      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));

      setTitle('');
      setContent('');

      setTimeout(() => router.back(), 1000); // go back to Home
    } catch (e) {
      console.error('Failed to save item', e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ThemedView style={{ flex: 1, padding: 20, alignItems: 'center' }}>
        <ThemedText style={{ fontSize: 22, marginBottom: 20 }}>Add New Item</ThemedText>
        <TextInput
          placeholder="Title (optional)"
          placeholderTextColor={themeColors.tabIconDefault}
          value={title}
          onChangeText={setTitle}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 10,
            marginBottom: 20,
            width: '100%',
            color: themeColors.text,
          }}
        />
        <TextInput
          placeholder="Content"
          placeholderTextColor={themeColors.tabIconDefault}
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            textAlignVertical: 'top',
            padding: 10,
            marginBottom: 20,
            width: '100%',
            height: '30%',
            maxHeight: '60%',
            color: themeColors.text,
          }}
        />
        <Button title="Save" onPress={saveItem} />
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}
