import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Game: { startWord: string; targetWord: string };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [startWord, setStartWord] = useState('');
  const [targetWord, setTargetWord] = useState('');

  const validateInputs = () => {
    if (!startWord || !targetWord) {
      Alert.alert('Error', 'Please enter both start and target words');
      return false;
    }
    if (startWord.length !== targetWord.length) {
      Alert.alert('Error', 'Start and target words must be the same length');
      return false;
    }
    const regex = /^[a-zA-Z]+$/;
    if (!regex.test(startWord) || !regex.test(targetWord)) {
      Alert.alert('Error', 'Words must contain letters only');
      return false;
    }
    return true;
  };

  const onStartGame = () => {
    if (validateInputs()) {
      navigation.navigate('Game', {
        startWord: startWord.toLowerCase(),
        targetWord: targetWord.toLowerCase(),
      });
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>WordShift</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Start Word"
        value={startWord}
        onChangeText={text => setStartWord(text)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Target Word"
        value={targetWord}
        onChangeText={text => setTargetWord(text)}
        autoCapitalize="none"
      />
      <View style={styles.buttonContainer}>
        <Button title="Start Game" onPress={onStartGame} color="#5a67d8" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    color: '#f6e05e',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    backgroundColor: '#1a202c',
    color: '#f7fafc',
    fontSize: 18,
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    borderColor: '#5a67d8',
    borderWidth: 1,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

