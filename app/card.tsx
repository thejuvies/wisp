import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSearchParams } from 'expo-router/build/hooks';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function CardModalScreen() {
  const params = useSearchParams();
  const title = params.title || 'No Title';
  const content = params.content || 'No Content';
   console.log(params.title);   // "Hello"
  console.log(params.content); 

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
