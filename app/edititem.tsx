import { View, TextInput, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export default function ModalScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    useEffect(()=>{
        const load = async ()=>{
            const item = JSON.parse(await AsyncStorage.getItem('displayItem'));
            setId(item.id);
            setTitle(item.title);
            setContent(item.content);
        }
        load();
    },[]);
    const saveItem = async () => {
        try {
            const stored = await AsyncStorage.getItem('items');
            const items = stored ? JSON.parse(stored) : [];

            const updatedItems = items.map((item: any) => {
                if (item.id === id) {
                return { ...item, title: title, content: content };
                }
                return item;
            });
            const displayItem = {
                id: id,
                title: title,
                content: content
            }
            await AsyncStorage.setItem('displayItem', JSON.stringify(displayItem));
            await AsyncStorage.setItem('items', JSON.stringify(updatedItems));


            setTimeout(() => router.back(), 500);
        } catch (e) {
            console.error('Failed to save item', e);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ThemedView style={{ flex: 1, padding: 20, alignItems: 'center' }}>
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
