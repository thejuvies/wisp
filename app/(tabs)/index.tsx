import { ScrollView, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const router = useRouter();
    const [items, setItems] = useState([]);
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    const loadItems = async () => {
        try {
            const stored = await AsyncStorage.getItem('items');
            setItems(stored ? JSON.parse(stored) : []);
        } catch (e) {
            console.error('Failed to load items', e);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadItems();
        }, [])
    );
    let title;
    let content;
    return (
        <ThemedView style={{ flex: 1, padding: 20 }}>
            <SafeAreaView 
                style={{flex:1}}
            >
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    // showsVerticalScrollIndicator={false}
                    style={{ flex: 1, width: '100%' }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{ marginBottom: 12 }}
                            onPress={async () => {
                                let displayItem = {
                                    title: item.title,
                                    content: item.content
                                }
                                await AsyncStorage.setItem('displayItem', JSON.stringify(displayItem));
                                router.push({
                                    pathname: '/card'
                                });
                            }

                            }
                        >
                            <ThemedView
                                style={{
                                    padding: 20,
                                    borderColor: themeColors.text,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                }}
                            >
                                <ThemedText style={{ fontSize: 18, fontWeight: 'bold' }}>
                                    {item.title || 'No Title'}
                                </ThemedText>
                                <ThemedText style={{ fontSize: 16, marginTop: 5 }}>
                                    {item.content || 'No Content'}
                                </ThemedText>
                            </ThemedView>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>

            <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => router.push('/modal')}
            >
                <Text style={styles.addButton}>+</Text>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    addButtonContainer: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#323232ff',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    addButton: {
        fontSize: 27,
        color: 'white',
    },
});
