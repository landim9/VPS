import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default function CreatePollScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');

  const createPoll = () => {
    const poll = {
      title,
      options: [
        { option: optionOne, votes: 0 },
        { option: optionTwo, votes: 0 }
      ],
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    firebase.firestore().collection('polls').add(poll)
      .then(() => {
        navigation.navigate('Enquetes');
      })
      .catch(error => {
        Alert.alert('Erro', error.message);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Título da Enquete"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Opção 1"
        value={optionOne}
        onChangeText={setOptionOne}
      />
      <TextInput
        placeholder="Opção 2"
        value={optionTwo}
        onChangeText={setOptionTwo}
      />
      <Button title="Criar Enquete" onPress={createPoll} />
    </View>
  );
}