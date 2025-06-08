import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

type WordChainItem = { key: string };

export default function GameScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { startWord, targetWord } = route.params as { startWord: string; targetWord: string };

  const [wordChain, setWordChain] = useState<WordChainItem[]>([{ key: startWord.toLowerCase() }]);
  const [inputWord, setInputWord] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  const isOneLetterDiff = (a: string, b: string) => {
    if (a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) diff++;
    }
    return diff === 1;
  };

  const isValidEnglishWord = (word: string) => {
    // Replace this with a real dictionary API or JSON later
    return /^[a-zA-Z]+$/.test(word);
  };

  const handleSubmit = () => {
    const prevWord = wordChain[wordChain.length - 1].key;
    const nextWord = inputWord.trim().toLowerCase();

    if (!isValidEnglishWord(nextWord)) {
      alert('❌ Not a valid English word!');
    } else if (!isOneLetterDiff(prevWord, nextWord)) {
      alert('⚠️ Must differ by exactly one letter!');
    } else {
      const newChain = [...wordChain, { key: nextWord }];
      setWordChain(newChain);
      setInputWord('');

      if (nextWord === targetWord.toLowerCase()) {
        setIsGameOver(true);
      }
    }
  };

  const handlePlayAgain = () => {
    navigation.navigate('Home' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔤 Transform "{startWord}" → "{targetWord}"</Text>

      <FlatList
        data={wordChain}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <Text style={styles.word}>{item.key}</Text>}
        contentContainerStyle={{ marginVertical: 10 }}
      />

      {!isGameOver && (
        <>
          <TextInput
            value={inputWord}
            onChangeText={setInputWord}
            placeholder="Enter next word"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </>
      )}

      {isGameOver && (
        <View style={styles.overlay}>
          <Text style={styles.congrats}>🎉 You Did It!</Text>
          <Text style={styles.steps}>Steps taken: {wordChain.length - 1}</Text>
          <Button title="Play Again" onPress={handlePlayAgain} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0e0e10',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  word: {
    fontSize: 20,
    color: '#61dafb',
    textAlign: 'center',
    marginVertical: 4,
  },
  input: {
    borderColor: '#fff',
    borderWidth: 1,
    padding: 10,
    color: '#fff',
    marginBottom: 10,
    borderRadius: 8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  congrats: {
    fontSize: 32,
    color: '#00ff99',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  steps: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
});
