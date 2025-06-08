import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import englishWords from 'an-array-of-english-words';

type RootStackParamList = {
  Game: { startWord: string; targetWord: string };
};

type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;

const GameScreen = () => {
  const route = useRoute<GameScreenRouteProp>();
  const { startWord, targetWord } = route.params;

  const [currentWord, setCurrentWord] = useState(startWord);
  const [nextWord, setNextWord] = useState('');
  const [chain, setChain] = useState([startWord]);

  const isValidEnglishWord = (word: string) => {
    return englishWords.includes(word.toLowerCase());
  };

  const isOneLetterDifferent = (word1: string, word2: string) => {
    if (word1.length !== word2.length) return false;
    let diff = 0;
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) diff++;
      if (diff > 1) return false;
    }
    return diff === 1;
  };

  const handleNextWord = () => {
    const word = nextWord.toLowerCase();

    if (!isValidEnglishWord(word)) {
      Alert.alert('Invalid Word', `"${word}" is not a valid English word`);
      return;
    }

    if (!isOneLetterDifferent(currentWord, word)) {
      Alert.alert('Invalid Move', 'The word must differ by exactly one letter');
      return;
    }

    setChain([...chain, word]);
    setCurrentWord(word);
    setNextWord('');

    if (word === targetWord.toLowerCase()) {
      Alert.alert('🎉 Success', 'You reached the target word!');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Transform: {startWord.toUpperCase()} → {targetWord.toUpperCase()}</Text>

      <Text style={styles.sub}>Current Word: <Text style={styles.currentWord}>{currentWord.toUpperCase()}</Text></Text>

      <TextInput
        style={styles.input}
        placeholder="Enter next word"
        value={nextWord}
        onChangeText={setNextWord}
        autoCapitalize="none"
      />

      <Button title="Submit" onPress={handleNextWord} color="#48bb78" />

      <Text style={styles.chainTitle}>Your Path:</Text>
      <FlatList
        data={chain}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.chainItem}>{item.toUpperCase()}</Text>}
      />
    </KeyboardAvoidingView>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a202c',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    color: '#f6e05e',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sub: {
    fontSize: 18,
    color: '#f7fafc',
    marginBottom: 10,
    textAlign: 'center',
  },
  currentWord: {
    color: '#63b3ed',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#2d3748',
    color: 'white',
    padding: 12,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 20,
    borderColor: '#48bb78',
    borderWidth: 1,
  },
  chainTitle: {
    fontSize: 18,
    color: '#edf2f7',
    marginTop: 20,
    marginBottom: 5,
  },
  chainItem: {
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 4,
    paddingLeft: 10,
  },
});
